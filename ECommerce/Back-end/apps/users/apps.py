from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.users'
    verbose_name = 'Users'

    def ready(self):
        from .bootstrap import ensure_default_roles
        import apps.users.signals  # noqa: F401

        ensure_default_roles()
