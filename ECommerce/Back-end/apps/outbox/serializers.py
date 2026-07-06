from rest_framework import serializers

from .models import OutboxEvent


class OutboxEventSerializer(serializers.ModelSerializer):
    payload = serializers.SerializerMethodField()

    SENSITIVE_PAYLOAD_KEYS = {
        'password',
        'token',
        'access',
        'refresh',
        'access_token',
        'refresh_token',
    }

    def get_payload(self, obj):
        return self._sanitize_payload(obj.payload)

    def _sanitize_payload(self, value):
        if isinstance(value, dict):
            return {
                key: self._sanitize_payload(item)
                for key, item in value.items()
                if key.lower() not in self.SENSITIVE_PAYLOAD_KEYS
            }
        if isinstance(value, list):
            return [self._sanitize_payload(item) for item in value]
        return value

    class Meta:
        model = OutboxEvent
        fields = (
            'id',
            'event_type',
            'aggregate_type',
            'aggregate_id',
            'payload',
            'status',
            'attempts',
            'last_error',
            'created_at',
            'processed_at',
        )
        read_only_fields = fields
