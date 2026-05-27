from rest_framework.permissions import (
    BasePermission
)


class IsAdmin(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (
            request.user.is_authenticated
            and request.user.role.name == 'Admin'
        )

class IsAdminOrEmployee(
    BasePermission
):

    def has_permission(
        self,
        request,
        view
    ):

        return (
            request.user.is_authenticated
            and request.user.role.name in [
                'Admin',
                'Employee'
            ]
        )

class IsCustomer(BasePermission):

    def has_permission(
        self,
        request,
        view
    ):

        return (
            request.user.is_authenticated
            and request.user.role.name == 'Customer'
        )