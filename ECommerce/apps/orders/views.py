from decimal import Decimal

from django.db import transaction
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from .models import Order, OrderItem, Cart, CartItem
from .serializers import OrderSerializer, OrderItemSerializer, CartSerializer, CartItemSerializer


def _is_admin_user(user):
    return bool(getattr(user, 'is_authenticated', False) and getattr(getattr(user, 'role', None), 'name', None) == 'Admin')

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.select_related('user').prefetch_related('items').order_by('id')
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if _is_admin_user(self.request.user):
            return queryset
        return queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        user = self.request.user
        cart = getattr(user, 'cart', None)
        if cart is None or not cart.items.exists():
            raise ValidationError('Cart is empty or does not exist')

        # calculate total from cart items
        total = Decimal('0.00')
        for ci in cart.items.select_related('product').all():
            total += Decimal(ci.quantity) * (ci.product.price or Decimal('0.00'))

        with transaction.atomic():
            order = serializer.save(user=user, total_price=total)

            # create OrderItem entries copying current product prices
            order_items = []
            for ci in cart.items.select_related('product').all():
                order_items.append(OrderItem(
                    order=order,
                    product=ci.product,
                    quantity=ci.quantity,
                    unit_price=ci.product.price
                ))
            OrderItem.objects.bulk_create(order_items)

            # clear the cart
            cart.items.all().delete()
    
class OrderItemViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.select_related('order', 'product').order_by('id')
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if _is_admin_user(self.request.user):
            return queryset
        return queryset.filter(order__user=self.request.user)
    
class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.select_related('user').prefetch_related('items__product').order_by('id')
    serializer_class = CartSerializer    

    def get_queryset(self):
        queryset = super().get_queryset()
        if _is_admin_user(self.request.user):
            return queryset
        return queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = CartItem.objects.select_related('cart__user', 'product').order_by('id')
    serializer_class = CartItemSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if _is_admin_user(self.request.user):
            return queryset
        return queryset.filter(cart__user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        cart = getattr(user, 'cart', None)
        if cart is None:
            cart = Cart.objects.create(user=user)
        serializer.save(cart=cart)

    def perform_update(self, serializer):
        # Ensure the cart association is preserved and belongs to the user
        instance = serializer.instance
        user = self.request.user
        if instance.cart.user_id != user.id:
            raise ValidationError('Cannot modify items of another user\'s cart')
        serializer.save()

""" class PaymentViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Payment.objects.select_related(
        'order'
    )
    serializer_class = PaymentSerializer """