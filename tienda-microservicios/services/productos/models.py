from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Producto(db.Model):
    __tablename__ = 'productos'

    id     = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    stock  = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id':     self.id,
            'nombre': self.nombre,
            'precio': self.precio,
            'stock':  self.stock
        }


class ProcessedMessage(db.Model):
    __tablename__ = 'processed_messages'

    id = db.Column(db.Integer, primary_key=True)
    saga_id = db.Column(db.String(36), index=True, nullable=False)
    event_type = db.Column(db.String(100), nullable=False)
    processed_at = db.Column(db.DateTime, default=db.func.now())


class Reservation(db.Model):
    __tablename__ = 'reservations'

    id = db.Column(db.Integer, primary_key=True)
    saga_id = db.Column(db.String(36), index=True, nullable=False)
    order_id = db.Column(db.Integer, nullable=True)
    items = db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())