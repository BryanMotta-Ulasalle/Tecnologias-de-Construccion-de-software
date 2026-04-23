from flask import Flask
from dotenv import load_dotenv
from models import db
from routes import usuarios_bp
import os
from flask_cors import CORS
# Carga las variables del archivo .env
load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app) 

    # Configuración de la base de datos
    # Flask-SQLAlchemy usa esta variable para conectarse
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

    # Desactiva el tracking de modificaciones (consume memoria innecesaria)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializa el ORM con la app
    # Esto "conecta" db con la app de Flask
    db.init_app(app)

    # Registra el blueprint — monta las rutas bajo /usuarios
    app.register_blueprint(usuarios_bp, url_prefix='/usuarios')
        # Habilita CORS para permitir peticiones desde el front-end
    # Crea las tablas si no existen
    # Es el equivalente a `prisma migrate dev`
    with app.app_context():
        db.create_all()
        print('✅ Tabla usuarios lista')

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5001))
    print(f'👤 Servicio Usuarios corriendo en http://localhost:{port}')
    app.run(port=port, debug=True)