from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import OrderViewSet, OrderItemViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'order-items', OrderItemViewSet, basename='orderitem')

urlpatterns = [
    path('', include(router.urls)),
]