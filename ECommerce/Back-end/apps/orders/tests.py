from decimal import Decimal
from unittest.mock import patch

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.orders.models import Cart, CartItem, Order, OrderItem
from apps.outbox.models import OutboxEvent
from apps.products.models import Category, Product
from apps.users.models import Role, User


class OrderStockTests(APITestCase):
    def setUp(self):
        customer_role, _ = Role.objects.get_or_create(
            id=3,
            defaults={"name": "Customer"},
        )
        self.user = User.objects.create_user(
            email="customer@example.com",
            password="Password123",
            name="Customer",
            role=customer_role,
        )
        self.category = Category.objects.create(
            name="Categoria",
            description="Categoria de prueba",
        )
        self.product = Product.objects.create(
            category=self.category,
            name="Producto",
            description="Producto de prueba",
            price=Decimal("25.00"),
            stock=2,
            status=True,
        )
        self.cart = Cart.objects.create(user=self.user)
        self.url = reverse("order-list")
        self.client.force_authenticate(user=self.user)

    def test_order_rejects_insufficient_stock(self):
        CartItem.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=3,
        )

        response = self.client.post(
            self.url,
            {"shipping_address": "Av. Principal 123"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("stock", response.data)
        self.assertFalse(Order.objects.filter(user=self.user).exists())
        self.assertFalse(OutboxEvent.objects.exists())
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 2)
        self.assertTrue(self.cart.items.exists())

    def test_order_decrements_stock_and_clears_cart(self):
        CartItem.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=2,
        )

        response = self.client.post(
            self.url,
            {"shipping_address": "Av. Principal 123"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 0)
        self.assertFalse(self.cart.items.exists())

        order = Order.objects.get(user=self.user)
        event = OutboxEvent.objects.get(
            event_type='ORDER_CREATED',
            aggregate_id=str(order.id),
        )

        self.assertEqual(event.status, OutboxEvent.Status.PENDING)
        self.assertEqual(event.aggregate_type, 'Order')
        self.assertEqual(event.payload['order_id'], order.id)
        self.assertEqual(event.payload['user_id'], self.user.id)
        self.assertEqual(event.payload['user_email'], self.user.email)
        self.assertEqual(event.payload['total_price'], '50.00')
        self.assertEqual(
            event.payload['shipping_address'],
            'Av. Principal 123',
        )
        self.assertEqual(event.payload['status'], order.status)
        self.assertEqual(
            event.payload['created_at'],
            order.created_at.isoformat(),
        )
        self.assertEqual(event.payload['items'], [{
            'product_id': self.product.id,
            'product_name': self.product.name,
            'quantity': 2,
            'unit_price': '25.00',
            'subtotal': '50.00',
        }])
        self.assertNotIn('password', event.payload)
        self.assertNotIn('token', event.payload)

    def test_empty_cart_does_not_create_order_or_outbox_event(self):
        response = self.client.post(
            self.url,
            {'shipping_address': 'Av. Principal 123'},
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(Order.objects.filter(user=self.user).exists())
        self.assertFalse(OutboxEvent.objects.exists())

    def test_outbox_failure_rolls_back_the_complete_order_transaction(self):
        CartItem.objects.create(
            cart=self.cart,
            product=self.product,
            quantity=2,
        )

        with patch(
            'apps.orders.views.OutboxEvent.objects.create',
            side_effect=RuntimeError('Outbox unavailable'),
        ):
            with self.assertRaises(RuntimeError):
                self.client.post(
                    self.url,
                    {'shipping_address': 'Av. Principal 123'},
                    format='json',
                )

        self.assertFalse(Order.objects.filter(user=self.user).exists())
        self.assertFalse(OrderItem.objects.exists())
        self.assertFalse(OutboxEvent.objects.exists())
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 2)
        self.assertTrue(self.cart.items.exists())


class OrderItemPermissionTests(APITestCase):
    def setUp(self):
        customer_role, _ = Role.objects.get_or_create(
            id=3,
            defaults={"name": "Customer"},
        )
        self.user = User.objects.create_user(
            email="items@example.com",
            password="Password123",
            name="Customer",
            role=customer_role,
        )
        self.category = Category.objects.create(name="Categoria")
        self.product = Product.objects.create(
            category=self.category,
            name="Producto",
            description="Producto de prueba",
            price=Decimal("10.00"),
            stock=5,
            status=True,
        )
        self.order = Order.objects.create(
            user=self.user,
            total_price=Decimal("10.00"),
            shipping_address="Av. Principal 123",
        )
        self.client.force_authenticate(user=self.user)

    def test_order_items_cannot_be_created_directly(self):
        response = self.client.post(
            reverse("orderitem-list"),
            {
                "order": self.order.id,
                "product": self.product.id,
                "quantity": 1,
                "unit_price": "10.00",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def test_orders_cannot_be_deleted_directly(self):
        response = self.client.delete(
            reverse("order-detail", args=[self.order.id]),
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )
        self.assertTrue(Order.objects.filter(id=self.order.id).exists())
