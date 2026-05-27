
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView, action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .serializers import RegisterSerializer, UserSerializer, RoleSerializer
from .models import User, Role
from rest_framework.permissions import AllowAny
from rest_framework import status
from .permissions import IsAdmin, IsAdminOrEmployee, IsCustomer

    
class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all().order_by('id')
    serializer_class = RoleSerializer
    permission_classes = [IsAdmin]
    
class UserViewSet(mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet):
    queryset = User.objects.select_related('role').order_by('id')
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
