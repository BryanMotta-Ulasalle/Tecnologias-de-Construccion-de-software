from flask import Blueprint, request, jsonify
from models import db, Usuario
# Blueprint es como un "router" de Express
# Agrupa rutas relacionadas — aquí todas las de /usuarios
usuarios_bp = Blueprint('usuarios', __name__)
# GET /usuarios — devuelve todos los usuarios
@usuarios_bp.route('/', methods=['GET'])
def listar_usuarios():
    # SELECT * FROM usuarios ORDER BY id
    usuarios = Usuario.query.order_by(Usuario.id).all()

    # Convertimos cada objeto a dict y respondemos con JSON
    return jsonify([u.to_dict() for u in usuarios])

# POST /usuarios — crea un usuario nuevo
@usuarios_bp.route('/', methods=['POST'])
def crear_usuario():
    data = request.get_json()  # Lee el body JSON del request

    # Validación
    if not data or not data.get('nombre') or not data.get('email'):
        return jsonify({'error': 'nombre y email son requeridos'}), 400

    # Verificamos que el email no exista ya
    existe = Usuario.query.filter_by(email=data['email']).first()
    if existe:
        return jsonify({'error': 'El email ya está registrado'}), 409

    # Creamos el objeto — todavía no está en la BD
    nuevo = Usuario(nombre=data['nombre'], email=data['email'])

    # Lo agregamos a la "sesión" (como un carrito de cambios)
    db.session.add(nuevo)

    # Aquí sí ejecuta el INSERT en la BD
    db.session.commit()

    return jsonify(nuevo.to_dict()), 201

# GET /usuarios/<id> — busca un usuario por id
# El servicio de pedidos usará este endpoint para validar
@usuarios_bp.route('/<int:id>', methods=['GET'])
def obtener_usuario(id):
    # get_or_404 busca por primary key y devuelve 404 si no existe
    usuario = Usuario.query.get_or_404(id, description='Usuario no encontrado')
    return jsonify(usuario.to_dict())