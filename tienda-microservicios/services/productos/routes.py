from flask import Blueprint, request, jsonify
from models import db, Producto

productos_bp = Blueprint('productos', __name__)

@productos_bp.route('/', methods=['GET'])
def listar_productos():
    productos = Producto.query.order_by(Producto.id).all()
    return jsonify([p.to_dict() for p in productos])

@productos_bp.route('/', methods=['POST'])
def crear_producto():
    data = request.get_json()

    if not data or not data.get('nombre') or data.get('precio') is None:
        return jsonify({'error': 'nombre y precio son requeridos'}), 400

    nuevo = Producto(
        nombre=data['nombre'],
        precio=float(data['precio']),
        stock=data.get('stock', 0)  # si no mandan stock, default 0
    )
    db.session.add(nuevo)
    db.session.commit()

    return jsonify(nuevo.to_dict()), 201

@productos_bp.route('/<int:id>', methods=['GET'])
def obtener_producto(id):
    producto = Producto.query.get_or_404(id, description='Producto no encontrado')
    return jsonify(producto.to_dict())