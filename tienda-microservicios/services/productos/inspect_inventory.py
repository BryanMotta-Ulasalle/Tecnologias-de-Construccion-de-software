import sys
import os

# ensure local package importable
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if BASE not in sys.path:
    sys.path.insert(0, BASE)

from app import create_app
from models import db, Producto, Reservation

def main():
    app = create_app()
    ctx = app.app_context()
    ctx.push()

    print('DB URI:', app.config.get('SQLALCHEMY_DATABASE_URI'))

    saga_ids = [
        '98f86cab-29c4-4502-a8aa-fd9657c22e39',
        '432b70ab-d162-4eab-b0ff-fc08e1f913f3'
    ]

    for s in saga_ids:
        res = Reservation.query.filter_by(saga_id=s).all()
        print(f'Saga {s} reservations: {len(res)}')
        for r in res:
            print('  ', r.id, r.order_id, r.items)

    for pid in (9, 10):
        p = Producto.query.get(pid)
        if p:
            print(f'Producto {pid}: stock={p.stock}, nombre={p.nombre}')
        else:
            print(f'Producto {pid}: NOT FOUND')

    ctx.pop()

if __name__ == '__main__':
    main()
