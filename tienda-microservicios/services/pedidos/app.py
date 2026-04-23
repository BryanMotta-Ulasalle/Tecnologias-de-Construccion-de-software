from flask import Flask
from dotenv import load_dotenv
from models import db
from routes import pedidos_bp
import os
from flask_cors import CORS
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"])
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    app.register_blueprint(pedidos_bp, url_prefix='/pedidos')

    with app.app_context():
        db.create_all()
        print('✅ Tabla pedidos lista')

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5003))
    print(f'🛒 Servicio Pedidos corriendo en http://localhost:{port}')
    app.run(port=port, debug=True)