from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils import timezone

from apps.outbox.models import OutboxEvent


class Command(BaseCommand):
    help = 'Process pending Transactional Outbox events.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--limit',
            type=int,
            default=10,
            help='Maximum number of events to process (default: 10).',
        )
        parser.add_argument(
            '--max-attempts',
            type=int,
            default=3,
            help='Failures allowed before marking an event FAILED (default: 3).',
        )

    def handle(self, *args, **options):
        limit = options['limit']
        max_attempts = options['max_attempts']

        if limit < 1:
            raise CommandError('--limit must be greater than zero.')
        if max_attempts < 1:
            raise CommandError('--max-attempts must be greater than zero.')

        attempted_event_ids = set()
        processed_count = 0
        failed_count = 0

        for _ in range(limit):
            result = self._process_next_event(
                max_attempts=max_attempts,
                excluded_ids=attempted_event_ids,
            )

            if result is None:
                break

            event_id, succeeded = result
            attempted_event_ids.add(event_id)

            if succeeded:
                processed_count += 1
            else:
                failed_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                'Outbox processing finished: '
                f'processed={processed_count}, failed={failed_count}.'
            )
        )

    def _process_next_event(self, max_attempts, excluded_ids):
        with transaction.atomic():
            queryset = (
                OutboxEvent.objects
                .select_for_update(skip_locked=True)
                .filter(status=OutboxEvent.Status.PENDING)
                .order_by('created_at', 'id')
            )

            if excluded_ids:
                queryset = queryset.exclude(id__in=excluded_ids)

            event = queryset.first()
            if event is None:
                return None

            event.status = OutboxEvent.Status.PROCESSING
            event.save(update_fields=('status',))

            try:
                self._process_event(event)
            except Exception as error:
                event.attempts += 1
                event.last_error = str(error)
                event.processed_at = None
                event.status = (
                    OutboxEvent.Status.FAILED
                    if event.attempts >= max_attempts
                    else OutboxEvent.Status.PENDING
                )
                event.save(update_fields=(
                    'status',
                    'attempts',
                    'last_error',
                    'processed_at',
                ))
                self.stderr.write(
                    self.style.ERROR(
                        f'Event {event.id} failed: {event.last_error}'
                    )
                )
                return event.id, False

            event.status = OutboxEvent.Status.PROCESSED
            event.last_error = ''
            event.processed_at = timezone.now()
            event.save(update_fields=(
                'status',
                'last_error',
                'processed_at',
            ))
            return event.id, True

    def _process_event(self, event):
        if event.event_type == 'ORDER_CREATED':
            self._process_order_created(event)
            return

        raise ValueError(f'Unsupported event type: {event.event_type}')

    def _process_order_created(self, event):
        order_id = event.payload.get('order_id')
        user_email = event.payload.get('user_email')

        if not order_id or not user_email:
            raise ValueError(
                'ORDER_CREATED requires order_id and user_email.'
            )

        self.stdout.write(
            'Simulating confirmation email '
            f'for order_id={order_id} user_email={user_email}'
        )
