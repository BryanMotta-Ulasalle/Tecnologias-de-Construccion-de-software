from rest_framework import serializers

from ECommerce.apps.products.models import Product

from .models import Order, OrderItem, Payment, Cart, CartItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'quantity', 'unit_price')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id','user', 'total_price', 'items', 'status', 'shipping_address')
        read_only_fields = ('total_price', 'status', 'user')
        
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'payment_method', 'payment_status', 'transaction_id', 'amount')
        read_only_fields = ('payment_status', 'transaction_id', 'amount')
        
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'product_id', 'quantity')

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'items')
        read_only_fields = ('user',)