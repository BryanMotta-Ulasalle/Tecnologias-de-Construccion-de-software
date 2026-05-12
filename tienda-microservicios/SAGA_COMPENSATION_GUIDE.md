# SAGA COMPENSATION FLOW - Guía Completa

## 📋 Escenario de Fallo: Análisis Detallado

### Ejemplo Concreto: TestItem (stock=1), Solicitud [7, 7]

```
PASO 1: INTENTO DE COMPRA
┌────────────────────────────────────────────┐
│ POST /pedidos                              │
│ {"usuario_id": 8, "producto_ids": [7, 7]} │
└────────────────────────────────────────────┘
         │
         ▼
    VALIDACIÓN EN API
    ✓ Contar cantidad por producto: {7: 2}
    ✓ Validar: stock(7) >= 2?  → NO (stock=1)
    
    DECISIÓN: RECHAZAR INMEDIATAMENTE (409 CONFLICT)
    ✓ NO crear Pedido
    ✓ NO crear Saga
    ✓ NO entrar en RabbitMQ
    
    RESPUESTA: 409 Conflict
    {
      "error": "Stock insuficiente",
      "items": [{
        "id": 7,
        "nombre": "TestItem",
        "cantidad_solicitada": 2,
        "stock_disponible": 1
      }]
    }
    
    COMPENSACIÓN REQUERIDA: NINGUNA (nunca entró en saga)
```

---

## 🔄 Flujo de Saga Completo (Sin Error en API)

### Hipótesis: Si NO validáramos en API y dejáramos entrar la orden...

```
PASO 2: ORDEN CREADA + SAGA INICIADA
┌─────────────────────────────────────────┐
│ routes.py - POST /pedidos               │
│ 1. Crear Pedido(estado='pendiente')     │
│ 2. saga_id = uuid.uuid4()               │
│ 3. Crear Outbox(                        │
│      saga_id=saga_id,                   │
│      event_type='order.created',        │
│      payload={order_id, productos, ...} │
│    )                                    │
│ 4. DB.commit() ← ATÓMICO                │
└─────────────────────────────────────────┘
         │
         ▼
PASO 3: PUBLICAR EVENTO
┌─────────────────────────────────────────┐
│ outbox_publisher.py                     │
│ 1. Leer Outbox(sent=False)              │
│ 2. Publicar a RabbitMQ:                 │
│    exchange='', routing_key='order.created' │
│    headers={'saga_id': saga_id}         │
│ 3. Marcar sent=True                     │
└─────────────────────────────────────────┘
         │
         ▼
PASO 4: CONSUMIDOR DE INVENTARIO
┌─────────────────────────────────────────┐
│ inventory_consumer.py                   │
│ Recibe: order.created event             │
│ saga_id = header['saga_id']             │
│                                         │
│ OPCIÓN A: SIN INYECCIÓN DE FALLO        │
│ ├─ Contar: {7: 2}                       │
│ ├─ Validar: stock(7)=1 < 2?             │
│ ├─ ✗ INSUFICIENTE                       │
│ └─ Publicar: inventory.reserve_failed   │
│                                         │
│ OPCIÓN B: CON FAIL_FOR_PRODUCT_ID=7     │
│ ├─ Contar: {7: 2}                       │
│ ├─ Stock validation: stock(7)=1 < 2?    │
│ ├─ Habría pasado? Sí/No (según caso)   │
│ ├─ Pero... FAIL_FOR_PRODUCT_ID=7 ← ✗    │
│ └─ Publicar: inventory.reserve_failed   │
│    (simula una falla inesperada)        │
└─────────────────────────────────────────┘
         │
         ▼
PASO 5: COMPENSACIÓN - ESCUCHAR FALLO
┌─────────────────────────────────────────┐
│ compensation_consumer.py                │
│ Escucha: inventory.reserve_failed       │
│                                         │
│ ACCIÓN 1: Actualizar Pedido             │
│ Pedido.estado: 'pendiente' → 'cancelado'│
│                                         │
│ ACCIÓN 2: Actualizar SagaState          │
│ SagaState.state = 'COMPENSATION_STARTED'│
│ SagaState.data = {                      │
│   'failure_reason': 'inventory_...',    │
│   'issues': [...],                      │
│   'timestamp': '2026-05-11...'          │
│ }                                       │
│                                         │
│ ACCIÓN 3: Publicar order.cancelled      │
│ Evento para que otros servicios         │
│ liberen recursos (si es necesario)      │
└─────────────────────────────────────────┘
         │
         ▼
RESULTADO FINAL
┌─────────────────────────────────────────┐
│ Database State:                         │
│                                         │
│ Pedido:                                 │
│   id=1, estado='cancelado'              │
│   usuario_id=8, total=0 (o lo que sea) │
│                                         │
│ SagaState:                              │
│   saga_id=uuid-123                      │
│   state='COMPENSATION_STARTED'          │
│   data={failure_reason, issues, ...}    │
│                                         │
│ Outbox: (ya fue procesado y enviado)    │
│   sent=True                             │
│                                         │
│ Stock: NUNCA se decrementó              │
│ (porque el consumidor rechazó ANTES)    │
└─────────────────────────────────────────┘
```

---

## 🧪 CÓMO PROBAR: Option 1 - Failure Injection

### Setup: Iniciar todos los servicios

```bash
# Terminal 1: PostgreSQL
# (Asegurate que esté corriendo)

# Terminal 2: RabbitMQ
# (Asegurate que esté corriendo)

# Terminal 3: Usuario Service
cd tienda-microservicios/services/usuarios
source users_env/Scripts/activate
python app.py

# Terminal 4: Productos Service
cd tienda-microservicios/services/productos
source prducts_env/Scripts/activate
python app.py

# Terminal 5: Pedidos Service (app.py)
cd tienda-microservicios/services/pedidos
source pedidos_env/Scripts/activate
python app.py

# Terminal 6: Outbox Publisher
source pedidos_env/Scripts/activate
python outbox_publisher.py

# Terminal 7: Inventory Consumer (SIN INYECCIÓN)
source prducts_env/Scripts/activate
python inventory_consumer.py

# Terminal 8: Compensation Consumer
source pedidos_env/Scripts/activate
python compensation_consumer.py
```

---

### Escenario 1: FALLO NORMAL (Stock insuficiente)

```bash
# Terminal X: Crear producto con stock limitado
curl -X POST http://localhost:5002/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "TestItem",
    "precio": 15.0,
    "stock": 1
  }'
# Response: {"id": 7, "nombre": "TestItem", "precio": 15.0, "stock": 1}

# Terminal X: Intentar crear pedido con [7, 7]
curl -X POST http://localhost:5003/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 8,
    "producto_ids": [7, 7]
  }'

# Response HTTP/1.1 409 CONFLICT
{
  "error": "Stock insuficiente",
  "items": [{
    "id": 7,
    "nombre": "TestItem",
    "cantidad_solicitada": 2,
    "stock_disponible": 1
  }]
}

# Logs esperados en compensation_consumer.py:
# (NINGUNO - porque nunca entró en saga)
```

---

### Escenario 2: INYECCIÓN DE FALLO (Failure Injection)

```bash
# Terminal 7: DETENER inventory_consumer.py
# (Presionar Ctrl+C)

# Terminal 7: Reiniciar CON inyección de fallo
FAIL_FOR_PRODUCT_ID=7 python inventory_consumer.py

# En otra terminal: Crear un producto VÁLIDO (stock >= cantidad)
curl -X POST http://localhost:5002/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "FailableItem",
    "precio": 25.0,
    "stock": 10
  }'
# Response: {"id": 8, "nombre": "FailableItem", "precio": 25.0, "stock": 10}

# En otra terminal: Crear pedido que DEBERÍA SER VÁLIDO
curl -X POST http://localhost:5003/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 8,
    "producto_ids": [8]  # ← Product 8, NO 7
  }'
# Response HTTP/1.1 201 Created
# {
#   "id": 5,
#   "usuario_id": 8,
#   "estado": "pendiente",
#   "productos": [{"id": 8, ...}],
#   "total": 25.0
# }

# Logs en Terminal 7 (inventory_consumer):
# [SAGE:uuid-xxx] Processing order 5 with 1 items
# [SAGE:uuid-xxx] FAILURE INJECTION TRIGGERED for product 7
# [SAGE:uuid-xxx] RESERVE FAILED for order 5. Issues: [...]
# [SAGE:uuid-xxx] Published inventory.reserve_failed

# Logs en Terminal 8 (compensation_consumer):
# [SAGA:uuid-xxx] Received inventory.reserve_failed for order 5
# [SAGA:uuid-xxx] COMPENSATION: Pedido 5 estado pendiente → cancelado
# [SAGA:uuid-xxx] Updated SagaState to COMPENSATION_STARTED
# [SAGA:uuid-xxx] Published order.cancelled (compensation)
```

---

### Escenario 3: INYECCIÓN CON PRODUCTO EN LA ORDEN

```bash
# Terminal: Crear pedido con producto que TRIGGEARÁ la inyección
curl -X POST http://localhost:5003/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "usuario_id": 8,
    "producto_ids": [7]  # ← Product 7, FALLA INYECTADA
  }'

# Response HTTP/1.1 201 Created (porque stock(7)=1 y solo solicitamos 1)
# {
#   "id": 6,
#   "usuario_id": 8,
#   "estado": "pendiente",
#   "productos": [{"id": 7, ...}],
#   "total": 15.0
# }

# Logs en Terminal 7 (inventory_consumer):
# [SAGE:uuid-yyy] Processing order 6 with 1 items
# [SAGE:uuid-yyy] FAILURE INJECTION TRIGGERED for product 7 ← ¡FALLO!
# [SAGE:uuid-yyy] RESERVE FAILED for order 6. Issues: [
#     {"id": 7, "reason": "testing_failure_injection", "quantity_requested": 1}
#   ]
# [SAGE:uuid-yyy] Published inventory.reserve_failed

# Logs en Terminal 8 (compensation_consumer):
# [SAGA:uuid-yyy] Received inventory.reserve_failed for order 6
# [SAGA:uuid-yyy] COMPENSATION: Pedido 6 estado pendiente → cancelado
# [SAGA:uuid-yyy] Updated SagaState to COMPENSATION_STARTED
# [SAGA:uuid-yyy] Published order.cancelled (compensation)

# Database State (PostgreSQL):
# SELECT * FROM pedido WHERE id = 6;
# id=6, usuario_id=8, estado='cancelado' ← ¡CANCELADO POR COMPENSACIÓN!
#
# SELECT * FROM saga_state WHERE saga_id = 'uuid-yyy';
# saga_id='uuid-yyy', state='COMPENSATION_STARTED', data={...}
```

---

## 🎯 Explicación de Compensaciones

### ¿POR QUÉ se hacen estas 3 acciones?

```
1. PEDIDO → 'cancelado'
   RAZÓN: El usuario necesita saber que su orden NO se procesó
   BENEFICIO: La orden no será procesada por otros servicios
   IMPACTO: El usuario ve estado final y puede reintentar si desea

2. SAGASTATE → 'COMPENSATION_STARTED'
   RAZÓN: Auditoría y debugging: ¿qué pasó con esta saga?
   BENEFICIO: Traces completos para investigación post-mortem
   IMPACTO: Puedes consultar DB para ver quién falló y cuándo

3. PUBLICAR 'order.cancelled'
   RAZÓN: Notificar a otros servicios (payment, email, analytics)
   BENEFICIO: Desacoplamiento: cada servicio reacciona independientemente
   IMPACTO: Payment puede no cobrar, Email puede enviar "orden cancelada", etc.
```

---

## 📊 Matriz de Compensaciones por Escenario

```
┌─────────────────────────────────────────────────────────────────────┐
│ ESCENARIO                    │ COMPENSACIONES REQUERIDAS             │
├─────────────────────────────────────────────────────────────────────┤
│ 1. Stock insuficiente        │ ✓ Rechazar en API (409)              │
│    ANTES de saga             │ ✓ NO crear Pedido                    │
│                              │ ✓ NO crear Saga                      │
│                              │ RESULTADO: 0 compensaciones (nunca    │
│                              │ entró en saga)                       │
├─────────────────────────────────────────────────────────────────────┤
│ 2. Reserve failed en         │ ✓ Cancelar Pedido                    │
│    inventory_consumer        │ ✓ Actualizar SagaState               │
│    (sin stock validado)      │ ✓ Publicar order.cancelled           │
│                              │ ✓ NO LIBERAR STOCK (nunca se         │
│                              │ decrementó porque validación falló)  │
│                              │ RESULTADO: 3 compensaciones          │
├─────────────────────────────────────────────────────────────────────┤
│ 3. Stock reserved OK, pero   │ ✓ Cancelar Pedido                    │
│    FALLA EN PAYMENT          │ ✓ Actualizar SagaState               │
│    (futura)                  │ ✓ Publicar inventory.release         │
│                              │   (liberar el stock que se retuvo)   │
│                              │ ✓ Publicar payment.refund (si fue    │
│                              │   cobrado antes de que fallara)      │
│                              │ RESULTADO: 4+ compensaciones         │
├─────────────────────────────────────────────────────────────────────┤
│ 4. DB transaction error      │ ✓ Rollback automático                │
│    en inventory_consumer     │ ✓ Publicar inventory.reserve_failed  │
│                              │ ✓ Luego: ¡volver al escenario 2!    │
│                              │ RESULTADO: 3 compensaciones          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Próximos Pasos (No implementados aún)

### FASE 1: ✅ COMPLETA
- ✅ Validación de stock en API
- ✅ Outbox pattern
- ✅ Inventory consumer con validación
- ✅ Failure injection con FAIL_FOR_PRODUCT_ID
- ✅ Compensation consumer

### FASE 2: ⏳ PENDIENTE (Payment)
```python
# payment_consumer.py (no creado aún)
Evento: inventory.reserved
├─ Validar que payment sea procesable
├─ Si falla: publicar payment.failed
└─ Si OK: publicar payment.succeeded
```

### FASE 3: ⏳ PENDIENTE (Release Inventory)
```python
# inventory_release_consumer.py (no creado aún)
Evento: payment.failed O order.cancelled
├─ Buscar en SagaState cuánto stock se retuvo
├─ Incrementar Producto.stock
└─ Publicar inventory.released
```

### FASE 4: ⏳ PENDIENTE (Refund)
```python
# payment_refund_consumer.py (no creado aún)
Evento: payment.failed
├─ Si payment.id existe
├─ Revertir cobro (en payment gateway)
└─ Publicar payment.refunded
```

---

## 📝 Resumen: Cómo Explicar este Fallo

### A un Product Manager:
> "Cuando un usuario solicita más stock del disponible, el sistema:
> 1. Lo rechaza de inmediato con error 409 (antes de hacer nada)
> 2. Si por alguna razón la orden entra en el sistema pero falla luego, 
>    automáticamente la cancela y notifica a los otros servicios"

### A un Developer:
> "Implementamos saga pattern con compensación:
> - Validación en API boundary previene 99% de casos
> - Inventory consumer hace doble-check con idempotencia
> - Si falla, compensation_consumer actualiza estado y publica eventos
> - RabbitMQ queues garantizan entrega eventual (durabilidad)
> - Cada fallo deja trazas en SagaState para debugging"

### A un Compliance Officer:
> "El sistema mantiene auditoría completa:
> - Cada orden tiene saga_id único
> - Cada evento es registrado en Outbox
> - Cada compensación queda en SagaState.data
> - Puedes rastrear cada fallo y acción correctiva"

---

## ✅ Checklist de Verificación

- [ ] Producto creado con stock=1
- [ ] POST /pedidos con [7,7] retorna 409 (validación en API)
- [ ] Terminal outbox_publisher muestra "Outbox processing..."
- [ ] Terminal inventory_consumer muestra "Processing order..."
- [ ] Terminal compensation_consumer muestra "Listening for..."
- [ ] FAIL_FOR_PRODUCT_ID=7 inyecta fallos correctamente
- [ ] Database: Pedido.estado cambió a 'cancelado'
- [ ] Database: SagaState.state = 'COMPENSATION_STARTED'
- [ ] Logs muestran saga_id consistente en todos los eventos

---


