from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from apps.users.permissions import IsAdminOrEmployee
from django.db.models import Count


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.annotate(
        total_products=Count('products')
        ).order_by('id')
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminOrEmployee()]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('product_images').order_by('id')
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminOrEmployee()]
 
