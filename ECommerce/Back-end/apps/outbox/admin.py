from django.contrib import admin

from .models import OutboxEvent


@admin.register(OutboxEvent)
class OutboxEventAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'event_type',
        'aggregate_type',
        'aggregate_id',
        'status',
        'attempts',
        'created_at',
        'processed_at',
    )
    list_filter = ('status', 'event_type', 'aggregate_type')
    search_fields = ('event_type', 'aggregate_type', 'aggregate_id')
    readonly_fields = ('created_at', 'processed_at')
    ordering = ('created_at',)
