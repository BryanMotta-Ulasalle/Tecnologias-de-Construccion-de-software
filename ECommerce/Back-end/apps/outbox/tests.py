from io import StringIO
from unittest.mock import patch

from django.core.management import call_command
from django.urls import reverse
from django.test import TestCase
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from apps.users.models import Role, User
from .management.commands.process_outbox import Command
from .models import OutboxEvent


class OutboxEventModelTests(TestCase):
    def test_event_uses_pending_defaults(self):
        event = OutboxEvent.objects.create(
            event_type='ORDER_CREATED',
            aggregate_type='Order',
            aggregate_id='1',
            payload={'order_id': 1},
        )

        self.assertEqual(event.status, OutboxEvent.Status.PENDING)
        self.assertEqual(event.attempts, 0)
        self.assertEqual(event.last_error, '')
        self.assertIsNone(event.processed_at)


class ProcessOutboxCommandTests(TestCase):
    def create_event(self, **overrides):
        values = {
            'event_type': 'ORDER_CREATED',
            'aggregate_type': 'Order',
            'aggregate_id': '1',
            'payload': {
                'order_id': 1,
                'user_email': 'customer@example.com',
            },
        }
        values.update(overrides)
        return OutboxEvent.objects.create(**values)

    def run_command(self, **options):
        stdout = StringIO()
        stderr = StringIO()
        call_command(
            'process_outbox',
            stdout=stdout,
            stderr=stderr,
            **options,
        )
        return stdout.getvalue(), stderr.getvalue()

    def test_pending_event_is_marked_as_processed(self):
        event = self.create_event()

        stdout, stderr = self.run_command()

        event.refresh_from_db()
        self.assertEqual(event.status, OutboxEvent.Status.PROCESSED)
        self.assertIsNotNone(event.processed_at)
        self.assertEqual(event.attempts, 0)
        self.assertEqual(event.last_error, '')
        self.assertIn(
            'order_id=1 user_email=customer@example.com',
            stdout,
        )
        self.assertEqual(stderr, '')

    def test_failed_event_increases_attempts_and_returns_to_pending(self):
        event = self.create_event(event_type='UNKNOWN_EVENT')

        _, stderr = self.run_command(max_attempts=3)

        event.refresh_from_db()
        self.assertEqual(event.status, OutboxEvent.Status.PENDING)
        self.assertEqual(event.attempts, 1)
        self.assertIn('Unsupported event type', event.last_error)
        self.assertIn(f'Event {event.id} failed', stderr)

    def test_event_is_marked_failed_when_max_attempts_is_reached(self):
        event = self.create_event(
            event_type='UNKNOWN_EVENT',
            attempts=2,
        )

        self.run_command(max_attempts=3)

        event.refresh_from_db()
        self.assertEqual(event.status, OutboxEvent.Status.FAILED)
        self.assertEqual(event.attempts, 3)
        self.assertIn('Unsupported event type', event.last_error)

    def test_processed_event_is_not_processed_again(self):
        processed_at = timezone.now()
        event = self.create_event(
            status=OutboxEvent.Status.PROCESSED,
            processed_at=processed_at,
        )

        with patch.object(Command, '_process_event') as processor:
            self.run_command()

        processor.assert_not_called()
        event.refresh_from_db()
        self.assertEqual(event.status, OutboxEvent.Status.PROCESSED)
        self.assertEqual(event.processed_at, processed_at)

    def test_failed_event_does_not_stop_the_rest_of_the_batch(self):
        failed_event = self.create_event(
            event_type='UNKNOWN_EVENT',
            aggregate_id='1',
        )
        successful_event = self.create_event(
            aggregate_id='2',
            payload={
                'order_id': 2,
                'user_email': 'second@example.com',
            },
        )

        self.run_command(limit=2)

        failed_event.refresh_from_db()
        successful_event.refresh_from_db()
        self.assertEqual(failed_event.status, OutboxEvent.Status.PENDING)
        self.assertEqual(successful_event.status, OutboxEvent.Status.PROCESSED)


class OutboxEventApiTests(APITestCase):
    def setUp(self):
        admin_role, _ = Role.objects.get_or_create(
            id=1,
            defaults={'name': 'Admin'},
        )
        employee_role, _ = Role.objects.get_or_create(
            id=2,
            defaults={'name': 'Employee'},
        )
        customer_role, _ = Role.objects.get_or_create(
            id=3,
            defaults={'name': 'Customer'},
        )
        self.admin = self.create_user('admin@example.com', admin_role)
        self.employee = self.create_user(
            'employee@example.com',
            employee_role,
        )
        self.customer = self.create_user(
            'customer@example.com',
            customer_role,
        )
        self.pending_event = self.create_event(
            aggregate_id='1',
            status=OutboxEvent.Status.PENDING,
        )
        self.processed_event = self.create_event(
            aggregate_id='2',
            status=OutboxEvent.Status.PROCESSED,
            processed_at=timezone.now(),
        )
        self.list_url = reverse('outboxevent-list')

    @staticmethod
    def create_user(email, role):
        return User.objects.create_user(
            email=email,
            password='Password123',
            name=role.name,
            role=role,
        )

    @staticmethod
    def create_event(**overrides):
        values = {
            'event_type': 'ORDER_CREATED',
            'aggregate_type': 'Order',
            'aggregate_id': '1',
            'payload': {
                'order_id': 1,
                'user_email': 'customer@example.com',
            },
        }
        values.update(overrides)
        return OutboxEvent.objects.create(**values)

    def test_admin_can_list_events(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['id'], self.processed_event.id)
        self.assertIn('payload', response.data[0])

    def test_admin_can_retrieve_event_detail(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(
            reverse('outboxevent-detail', args=[self.pending_event.id]),
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.pending_event.id)
        self.assertEqual(response.data['status'], OutboxEvent.Status.PENDING)

    def test_admin_can_filter_events_by_status(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(
            self.list_url,
            {'status': 'processed'},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.processed_event.id)

    def test_api_redacts_sensitive_payload_keys(self):
        self.pending_event.payload = {
            'order_id': 1,
            'password': 'must-not-be-exposed',
            'nested': {
                'access_token': 'must-not-be-exposed',
                'safe_value': 'visible',
            },
        }
        self.pending_event.save(update_fields=('payload',))
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(
            reverse('outboxevent-detail', args=[self.pending_event.id]),
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('password', response.data['payload'])
        self.assertNotIn(
            'access_token',
            response.data['payload']['nested'],
        )
        self.assertEqual(
            response.data['payload']['nested']['safe_value'],
            'visible',
        )

    def test_customer_cannot_list_events(self):
        self.client.force_authenticate(user=self.customer)

        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_employee_cannot_list_events(self):
        self.client.force_authenticate(user=self.employee)

        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_list_events(self):
        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_events_cannot_be_created_from_api(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.post(
            self.list_url,
            {
                'event_type': 'MANUAL_EVENT',
                'aggregate_type': 'Order',
                'aggregate_id': '3',
                'payload': {},
            },
            format='json',
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_405_METHOD_NOT_ALLOWED,
        )
        self.assertEqual(OutboxEvent.objects.count(), 2)
