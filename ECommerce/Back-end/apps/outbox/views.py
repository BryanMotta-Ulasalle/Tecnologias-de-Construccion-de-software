from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from apps.users.permissions import IsAdmin

from .models import OutboxEvent
from .serializers import OutboxEventSerializer


class OutboxEventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OutboxEventSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        queryset = OutboxEvent.objects.order_by('-created_at', '-id')
        status_value = self.request.query_params.get('status')

        if not status_value:
            return queryset

        normalized_status = status_value.upper()
        if normalized_status not in OutboxEvent.Status.values:
            raise ValidationError({
                'status': (
                    'Invalid status. Expected one of: '
                    f'{", ".join(OutboxEvent.Status.values)}.'
                )
            })

        return queryset.filter(status=normalized_status)
