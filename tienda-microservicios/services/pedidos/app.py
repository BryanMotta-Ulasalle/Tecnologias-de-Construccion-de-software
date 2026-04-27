from flask import Flask
from dotenv import load_dotenv
from models import db
from routes import pedidos_bp
import os
from flask_cors import CORS
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(
        app,
        resources={r"/pedidos/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.url_map.strict_slashes = False

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