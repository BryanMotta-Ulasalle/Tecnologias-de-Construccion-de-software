import os
import sys

# ensure shared package is importable
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if BASE not in sys.path:
    sys.path.insert(0, BASE)

from shared.messaging import publish

def main():
    # Release for order 24 (product id 9)
    publish('inventory.release', {
        'order_id': 24,
        'productos': [{'id': 9, 'cantidad': 1}]
    }, saga_id='98f86cab-29c4-4502-a8aa-fd9657c22e39')
    print('Published inventory.release for order 24')

    # Release for order 29 (product id 10)
    publish('inventory.release', {
        'order_id': 29,
        'productos': [{'id': 10, 'cantidad': 1}]
    }, saga_id='432b70ab-d162-4eab-b0ff-fc08e1f913f3')
    print('Published inventory.release for order 29')

if __name__ == '__main__':
    main()
