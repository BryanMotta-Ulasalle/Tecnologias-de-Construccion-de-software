from rest_framework import serializers
from .models import User, Role
from rest_framework.validators import UniqueValidator

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        source='role',
        write_only=True
    )

    password = serializers.CharField(
    write_only=True,
    required=False,
    min_length=8
)
    
    
    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'email',
            'status',
            'created_at',
            'updated_at',
            'role',
            'role_id',
            'password',
        )

        read_only_fields = (
            'id',
            'created_at',
            'updated_at',
        )
        
    
    def update(self, instance, validated_data):

        password = validated_data.pop(
            'password',
            None
        )

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        return instance

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=8
    )
    
    role_id = serializers.PrimaryKeyRelatedField(
    queryset=Role.objects.all(),
    source='role',
    write_only=True
)
    email = serializers.EmailField(
    validators=[
        UniqueValidator(
            queryset=User.objects.all(),
            message='El email ya está registrado'
        )
    ]
)

    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'email',
            'password',
            'role_id',
        )
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        role = validated_data.pop('role', None)
        if role is None:
            try:
                role = Role.objects.get(name='Customer')
            except Role.DoesNotExist:
                role = None

        user = User(**validated_data)
        if role:
            user.role = role

        user.set_password(password)
        user.save()
        return user