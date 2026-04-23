from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# db es la instancia del ORM
# Se crea aquí y se comparte con app.py y routes.py
db = SQLAlchemy()

class Usuario(db.Model):
    # Le decimos a SQLAlchemy cómo se llama la tabla en la BD
    __tablename__ = 'usuarios'

    # Columnas — cada atributo es una columna
    id         = db.Column(db.Integer, primary_key=True)
    nombre     = db.Column(db.String(100), nullable=False)
    email      = db.Column(db.String(100), unique=True, nullable=False)
    creado_en  = db.Column(db.DateTime, default=datetime.utcnow)

    # Este método convierte el objeto a diccionario
    # Lo necesitamos para poder responder con JSON
    def to_dict(self):
        return {
            'id':        self.id,
            'nombre':    self.nombre,
            'email':     self.email,
            'creado_en': self.creado_en.isoformat()
        }