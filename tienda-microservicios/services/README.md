# Informe de Arquitectura del Backend

Este documento resume cómo está estructurado el backend de la tienda, qué responsabilidad cumple cada microservicio y cómo el diseño se relaciona con una arquitectura de componentes distribuidos.

## 1. Vista General

El backend está organizado como un sistema de microservicios independientes, cada uno con su propia aplicación Flask, su propia base de datos PostgreSQL y su propio ciclo de ejecución.

Los servicios principales son:

- `usuarios`: gestiona clientes y usuarios del sistema.
- `productos`: administra el catálogo de productos.
- `pedidos`: orquesta la creación y consulta de pedidos.

Cada servicio expone una API REST y escucha en un puerto distinto:

- `usuarios`: `http://localhost:5001`
- `productos`: `http://localhost:5002`
- `pedidos`: `http://localhost:5003`

## 2. Estructura del Backend

La carpeta `services/` contiene tres subdirectorios, uno por dominio funcional.

### `services/usuarios`

- `app.py`: crea la aplicación Flask, registra rutas y configura la base de datos.
- `routes.py`: define los endpoints HTTP del servicio.
- `models.py`: contiene los modelos SQLAlchemy.
- `requirements.txt`: dependencias Python.
- `.env`: variables de entorno del servicio.

Responsabilidad principal: persistir y exponer información de usuarios.

### `services/productos`

- `app.py`
- `routes.py`
- `models.py`
- `requirements.txt`
- `.env`

Responsabilidad principal: persistir y exponer el catálogo de productos.

### `services/pedidos`

- `app.py`
- `routes.py`
- `models.py`
- `requirements.txt`
- `.env`

Responsabilidad principal: crear pedidos, validar usuarios y productos, y almacenar una fotografía del pedido al momento de la compra.

## 3. Arquitectura Aplicada

El backend sigue una arquitectura de microservicios orientada a dominios.

### Capas internas por servicio

Cada microservicio mantiene una separación simple de responsabilidades:

- `app.py`: inicialización, configuración y registro del blueprint.
- `routes.py`: capa de exposición HTTP.
- `models.py`: capa de persistencia y modelo de datos.

Aunque es una estructura ligera, sigue el principio de separar la entrada HTTP de la lógica de persistencia.

### Persistencia independiente

Cada servicio usa una base de datos PostgreSQL propia:

- `usuarios_db`
- `productos_db`
- `pedidos_db`

Eso evita que un servicio dependa físicamente del esquema de otro. Cada dominio puede evolucionar sin bloquear a los demás.

### Comunicación entre servicios

La integración no se hace por acceso directo a base de datos compartida, sino por HTTP entre APIs.

El servicio `pedidos` consulta a:

- `usuarios` para validar que el usuario exista.
- `productos` para validar cada producto incluido en el pedido.

Esta decisión desacopla los datos y mantiene cada componente con autonomía de almacenamiento.

## 4. Relación con Componentes Distribuidos

Este sistema se relaciona directamente con el concepto de componentes distribuidos porque separa la solución en piezas ejecutables de forma independiente que cooperan por red.

### Propiedades distribuidas que sí aparecen aquí

#### Independencia de despliegue

Cada microservicio puede iniciarse, detenerse o actualizarse sin obligar a recompilar todo el sistema.

#### Comunicación remota

Los servicios se comunican mediante peticiones HTTP REST, lo cual introduce latencia y posibles fallos de red, características típicas de sistemas distribuidos.

#### Aislamiento de fallos

Si falla `productos`, el sistema no necesariamente deja de funcionar por completo; el impacto se concentra en operaciones que dependen de ese servicio.

#### Escalabilidad por dominio

Es posible escalar solo el servicio que recibe más carga. Por ejemplo, `pedidos` puede crecer de forma distinta a `usuarios`.

#### Contratos explícitos

Los servicios intercambian datos mediante contratos JSON. Por ejemplo, `pedidos` espera `usuario_id` y `producto_ids` para crear un pedido.

## 5. Flujo de Creación de Pedido

El flujo de alta de pedidos muestra bien la arquitectura distribuida:

1. El frontend envía un `POST /pedidos/`.
2. `pedidos` recibe `usuario_id` y la lista `producto_ids`.
3. `pedidos` consulta `usuarios` para validar el usuario.
4. `pedidos` consulta `productos` para recuperar cada producto.
5. `pedidos` calcula el total.
6. `pedidos` guarda el pedido en su propia base de datos.
7. `pedidos` responde con el pedido creado y la información del usuario.

Este flujo muestra un patrón de orquestación: el servicio de pedidos coordina, pero no reemplaza la responsabilidad de usuarios o productos.

## 6. Roles Funcionales de Cada Servicio

### Usuarios

Es el sistema de referencia para identidad básica de cliente o usuario. Su API se usa como fuente de verdad para validar que un usuario exista antes de crear un pedido.

### Productos

Es el sistema de referencia para el catálogo comercial. Proporciona nombre, precio y stock para el armado del pedido.

### Pedidos

Es el agregador transaccional del proceso de compra. No inventa datos de usuarios o productos; los consulta y guarda un snapshot del pedido.

## 7. Ventajas del Diseño Actual

- Separación clara por dominio.
- Base de datos independiente por microservicio.
- APIs pequeñas y fáciles de probar.
- Menor acoplamiento que en una aplicación monolítica.
- Posibilidad de evolucionar cada servicio por separado.

## 8. Riesgos y Consideraciones

Este enfoque también introduce costos típicos de sistemas distribuidos:

- Más complejidad operativa.
- Dependencia de disponibilidad de red.
- Posibles inconsistencias temporales entre servicios.
- Necesidad de mantener contratos estables entre APIs.

En particular, el servicio de pedidos depende de la disponibilidad de usuarios y productos para validar una operación, por lo que cualquier problema en esos servicios impacta la creación de pedidos.

## 9. Mejoras que Podrían Implementarse

Aunque la arquitectura actual funciona bien para un proyecto académico o una primera versión, hay varias mejoras que podrían fortalecerla:

- **API Gateway**: centralizar el acceso al backend para simplificar el consumo desde el frontend y unificar autenticación, logs y enrutamiento.
- **Comunicación resiliente**: agregar timeouts, reintentos y circuit breakers en las llamadas entre servicios para evitar que una caída temporal afecte todo el flujo.
- **Mensajería asíncrona**: mover procesos no críticos a colas o eventos, por ejemplo notificaciones o auditoría, para reducir acoplamiento temporal.
- **Observabilidad**: incorporar logs estructurados, métricas y trazas distribuidas para diagnosticar mejor problemas entre servicios.
- **Autenticación y autorización**: definir un mecanismo común, como JWT, para proteger rutas y evitar duplicar lógica de seguridad.
- **Validación compartida de contratos**: documentar los payloads con OpenAPI o esquemas JSON para reducir errores entre frontend y backend.
- **Contenerización completa**: empaquetar cada microservicio en un contenedor para facilitar despliegue, escalado y portabilidad.
- **Pruebas de integración**: automatizar pruebas entre servicios para verificar que usuarios, productos y pedidos sigan interoperando correctamente.
- **Gestión centralizada de configuración**: mover variables comunes a un sistema de configuración compartido para evitar inconsistencias entre entornos.

## 10. Conclusión

La solución está estructurada como una arquitectura de microservicios con responsabilidades bien delimitadas. Cada componente mantiene sus datos, expone su API y colabora con los demás por HTTP.

Desde la perspectiva de componentes distribuidos, el sistema ya incorpora sus rasgos esenciales: autonomía, comunicación remota, contratos explícitos e independencia de despliegue. El servicio de pedidos actúa como coordinador del flujo de compra, mientras usuarios y productos funcionan como fuentes especializadas de información.

Si el proyecto continúa creciendo, el siguiente paso natural sería documentar contratos de API con más detalle y definir mecanismos de tolerancia a fallos entre servicios.