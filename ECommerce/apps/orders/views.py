from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from .models import Order, Cart, CartItem
from .serializers import OrderSerializer, CartSerializer, CartItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.select_related('user').prefetch_related('items').order_by('id')
    serializer_class = OrderSerializer
    
class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.select_related('user').prefetch_related('items__product').order_by('id')
    serializer_class = CartSerializer    

class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = CartItem.objects.select_related('cart__user', 'product').order_by('id')
    serializer_class = CartItemSerializer

""" class PaymentViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Payment.objects.select_related(
        'order'
    )
    serializer_class = PaymentSerializer """