from flask import Blueprint, request, jsonify
from models import db, Pedido
import requests as http  # renombramos para no confundir con flask request
import os

pedidos_bp = Blueprint('pedidos', __name__)

USUARIOS_URL  = os.getenv('USUARIOS_SERVICE_URL')
PRODUCTOS_URL = os.getenv('PRODUCTOS_SERVICE_URL')

@pedidos_bp.route('/', methods=['GET'])
def listar_pedidos():
    pedidos = Pedido.query.order_by(Pedido.id.desc()).all()
    return jsonify([p.to_dict() for p in pedidos])

@pedidos_bp.route('/', methods=['POST'])
def crear_pedido():
    data = request.get_json()

    usuario_id  = data.get('usuario_id')
    producto_ids = data.get('producto_ids', [])  # lista de ids: [1, 2, 3]

    if not usuario_id or not producto_ids:
        return jsonify({'error': 'usuario_id y producto_ids son requeridos'}), 400

    # ── 1. Validar usuario llamando al servicio de usuarios ──
    resp = http.get(f'{USUARIOS_URL}/usuarios/{usuario_id}')
    if resp.status_code != 200:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    usuario = resp.json()

    # ── 2. Obtener cada producto llamando al servicio de productos ──
    productos_encontrados = []
    for pid in producto_ids:
        resp = http.get(f'{PRODUCTOS_URL}/productos/{pid}')
        if resp.status_code != 200:
            return jsonify({'error': f'Producto {pid} no encontrado'}), 404
        productos_encontrados.append(resp.json())

    # ── 3. Calcular total ──
    total = sum(p['precio'] for p in productos_encontrados)

    # ── 4. Guardar pedido con snapshot de productos ──
    nuevo = Pedido(
        usuario_id=usuario_id,
        productos=[{'id': p['id'], 'nombre': p['nombre'], 'precio': p['precio']}
                   for p in productos_encontrados],
        total=total
    )
    db.session.add(nuevo)
    db.session.commit()

    # ── 5. Responder con pedido + info del usuario ──
    resultado = nuevo.to_dict()
    resultado['usuario'] = usuario
    return jsonify(resultado), 201