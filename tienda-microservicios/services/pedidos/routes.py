from flask import Blueprint, request, jsonify
from models import db, Pedido, Outbox, SagaState
import requests as http  # renombramos para no confundir con flask request
import os
import logging
from collections import Counter

pedidos_bp = Blueprint('pedidos', __name__)
logger = logging.getLogger(__name__)

USUARIOS_URL  = os.getenv('USUARIOS_SERVICE_URL')
PRODUCTOS_URL = os.getenv('PRODUCTOS_SERVICE_URL')

@pedidos_bp.route('', methods=['GET'])
@pedidos_bp.route('/', methods=['GET'])
def listar_pedidos():
    pedidos = Pedido.query.order_by(Pedido.id.desc()).all()
    return jsonify([p.to_dict() for p in pedidos])

@pedidos_bp.route('', methods=['POST'])
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

    # ── 3. Validar stock ANTES de crear el pedido ──
    cantidades = Counter(producto_ids)
    productos_por_id = {}
    for producto in productos_encontrados:
        productos_por_id[producto['id']] = producto

    sin_stock = []
    for producto_id, cantidad in cantidades.items():
        producto = productos_por_id[producto_id]
        stock_disponible = producto.get('stock', 0)
        if stock_disponible < cantidad:
            sin_stock.append({
                'id': producto_id,
                'nombre': producto['nombre'],
                'cantidad_solicitada': cantidad,
                'stock_disponible': stock_disponible
            })

    if sin_stock:
        logger.warning(f'Pedido rechazado por stock insuficiente: {sin_stock}')
        return jsonify({
            'error': 'Stock insuficiente',
            'items': sin_stock
        }), 409

    # ── 4. Calcular total ──
    total = sum(p['precio'] for p in productos_encontrados)

    # ── 5. Guardar pedido con snapshot de productos y registrar evento Outbox ──
    from uuid import uuid4
    saga_id = str(uuid4())

    nuevo = Pedido(
        usuario_id=usuario_id,
        productos=[{'id': p['id'], 'nombre': p['nombre'], 'precio': p['precio']}
                   for p in productos_encontrados],
        total=total
    )

    # Insertar pedido y outbox en la misma transacción
    db.session.add(nuevo)
    db.session.flush()  # asigna ID al pedido
    
    # Ahora que tenemos el ID del pedido, crear el outbox con payload correcto
    out = Outbox(saga_id=saga_id, event_type='order.created', payload={
        'order_id': nuevo.id,
        'usuario_id': usuario_id,
        'productos': [{'id': p['id'], 'nombre': p['nombre'], 'precio': p['precio']} for p in productos_encontrados],
        'total': total
    })
    db.session.add(out)

    # guardar estado inicial de la saga
    saga = SagaState(saga_id=saga_id, state='STARTED', data={'order_id': nuevo.id})
    db.session.add(saga)

    db.session.commit()
    logger.info(f'[SAGA:{saga_id}] Pedido creado en estado pendiente y evento order.created encolado')

    # ── 6. Responder con pedido + info del usuario ──
    resultado = nuevo.to_dict()
    resultado['usuario'] = usuario
    resultado['saga_id'] = saga_id
    return jsonify(resultado), 201