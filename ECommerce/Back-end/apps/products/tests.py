from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.products.models import Category
from apps.users.models import Role, User


class CategoryPermissionTests(APITestCase):
    def setUp(self):
        self.admin_role, _ = Role.objects.get_or_create(
            id=1,
            defaults={"name": "Admin"},
        )
        self.employee_role, _ = Role.objects.get_or_create(
            id=2,
            defaults={"name": "Employee"},
        )
        self.customer_role, _ = Role.objects.get_or_create(
            id=3,
            defaults={"name": "Customer"},
        )
        self.admin = self._create_user("admin@example.com", self.admin_role)
        self.employee = self._create_user(
            "employee@example.com",
            self.employee_role,
        )
        self.customer = self._create_user(
            "customer@example.com",
            self.customer_role,
        )
        self.url = reverse("category-list")

    @staticmethod
    def _create_user(email, role):
        return User.objects.create_user(
            email=email,
            password="Password123",
            name=role.name,
            role=role,
        )

    def test_categories_are_publicly_readable(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_customer_cannot_create_category(self):
        self.client.force_authenticate(user=self.customer)

        response = self.client.post(
            self.url,
            {"name": "No autorizada", "description": ""},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(Category.objects.filter(name="No autorizada").exists())

    def test_admin_can_create_category(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.post(
            self.url,
            {"name": "Categoria Admin", "description": ""},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_employee_can_create_category(self):
        self.client.force_authenticate(user=self.employee)

        response = self.client.post(
            self.url,
            {"name": "Categoria Employee", "description": ""},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
