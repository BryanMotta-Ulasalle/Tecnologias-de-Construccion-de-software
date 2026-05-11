from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    id         = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, nullable=False)
    # JSON guarda el snapshot de los productos al momento de comprar
    productos  = db.Column(db.JSON, nullable=False)
    total      = db.Column(db.Float, nullable=False)
    estado     = db.Column(db.String(50), default='pendiente')
    creado_en  = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id':         self.id,
            'usuario_id': self.usuario_id,
            'productos':  self.productos,
            'total':      self.total,
            'estado':     self.estado,
            'creado_en':  self.creado_en.isoformat()
        }


class Outbox(db.Model):
    __tablename__ = 'outbox'

    id = db.Column(db.Integer, primary_key=True)
    saga_id = db.Column(db.String(36), index=True, nullable=False)
    event_type = db.Column(db.String(100), nullable=False)
    payload = db.Column(db.JSON, nullable=False)
    sent = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class SagaState(db.Model):
    __tablename__ = 'saga_states'

    saga_id = db.Column(db.String(36), primary_key=True)
    state = db.Column(db.String(50), nullable=False)
    data = db.Column(db.JSON, nullable=True)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)