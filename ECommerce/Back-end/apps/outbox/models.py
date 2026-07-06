from django.db import models


class OutboxEvent(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PROCESSING = 'PROCESSING', 'Processing'
        PROCESSED = 'PROCESSED', 'Processed'
        FAILED = 'FAILED', 'Failed'

    event_type = models.CharField(max_length=100)
    aggregate_type = models.CharField(max_length=100)
    aggregate_id = models.CharField(max_length=255)
    payload = models.JSONField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True,
    )
    attempts = models.PositiveIntegerField(default=0)
    last_error = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    processed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.event_type} - {self.aggregate_type}:{self.aggregate_id}'

    class Meta:
        db_table = 'outbox_events'
        ordering = ('created_at',)
        indexes = [
            models.Index(
                fields=('status', 'created_at'),
                name='outbox_status_created_idx',
            ),
        ]
