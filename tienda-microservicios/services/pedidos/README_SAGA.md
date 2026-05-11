# Saga coreografiada (Pedidos)

Archivos añadidos:

- `models.py`: se agregaron modelos `Outbox` y `SagaState`.
- `routes.py`: `crear_pedido` ahora inserta un registro en `outbox` y crea `SagaState`.
- `outbox_publisher.py`: worker que publica eventos pendientes en RabbitMQ.

Cómo ejecutar (desde la carpeta del servicio):

```bash
# exportar variables necesarias
export DATABASE_URL=sqlite:///pedidos.db
export RABBIT_HOST=localhost

# levantar servicio (opcional)
python app.py

# en otra terminal, ejecutar publisher
python outbox_publisher.py
```

Recomendaciones:
- Ejecutar `inventory_consumer.py` en el servicio `productos`.
- Configurar `RABBIT_HOST`, usuario/clave si aplica.
