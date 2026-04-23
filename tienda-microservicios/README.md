# 🏪 Tienda Microservicios

Sistema de e-commerce basado en microservicios con arquitectura separada en:
- **Frontend**: React + Vite (puerto 5173)
- **Backend**: 3 microservicios Python con Flask
  - 👤 **Usuarios** (puerto 5001)
  - 📦 **Productos** (puerto 5002)
  - 🛒 **Pedidos** (puerto 5003)
- **Base de datos**: PostgreSQL (3 instancias independientes)

---

## 📋 Requisitos Previos

### Sistema
- **Node.js** 16+ (para el frontend)
- **Python** 3.11+ (para los microservicios)
- **PostgreSQL** 15+ o Docker/Docker Compose
- **npm** (incluido con Node.js)
- **pip** (incluido con Python)

### Verificar instalaciones
```bash
node --version    # v16.0.0 o superior
npm --version     # 8.0.0 o superior
python --version  # 3.11 o superior
pip --version     # 23.0 o superior
```

---

## 🚀 Guía de Instalación y Ejecución

### 1️⃣ Preparar las Bases de Datos

#### Opción A: Con Docker Compose (Recomendado)

```bash
cd tienda-microservicios
docker-compose up -d
```

Esto levantará 3 contenedores PostgreSQL:
- `db_usuarios` (puerto 5432)
- `db_productos` (puerto 5433)
- `db_pedidos` (puerto 5434)

Verificar que estén corriendo:
```bash
docker-compose ps
```

#### Opción B: PostgreSQL Local

Si tienes PostgreSQL instalado localmente, crea 3 bases de datos:

```sql
-- Usuario: admin
-- Contraseña: secret123

CREATE DATABASE usuarios_db;
CREATE DATABASE productos_db;
CREATE DATABASE pedidos_db;
```

---

### 2️⃣ Configurar y Ejecutar Microservicios

Cada servicio tiene su propio entorno virtual (`venv`). Sigue estos pasos para cada uno:

#### Servicio de Usuarios (Puerto 5001)

```bash
cd services/usuarios

# Activar entorno virtual
source users_env/Scripts/activate  # Windows: users_env\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servicio
python app.py
```

**Salida esperada:**
```
✅ Tabla usuarios lista
👤 Servicio Usuarios corriendo en http://localhost:5001
 * Running on http://127.0.0.1:5001
```

#### Servicio de Productos (Puerto 5002)

```bash
cd services/productos

# Activar entorno virtual
source prducts_env/Scripts/activate  # Windows: prducts_env\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servicio
python app.py
```

**Salida esperada:**
```
✅ Tabla productos lista
📦 Servicio Productos corriendo en http://localhost:5002
 * Running on http://127.0.0.1:5002
```

#### Servicio de Pedidos (Puerto 5003)

```bash
cd services/pedidos

# Activar entorno virtual
source pedidos_env/Scripts/activate  # Windows: pedidos_env\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servicio
python app.py
```

**Salida esperada:**
```
✅ Tabla pedidos lista
🛒 Servicio Pedidos corriendo en http://localhost:5003
 * Running on http://127.0.0.1:5003
```

---

### 3️⃣ Configurar y Ejecutar Frontend

```bash
cd front-end

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

**Salida esperada:**
```
  VITE v8.0.9  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Abre http://localhost:5173 en tu navegador.

---

## ⚙️ Variables de Entorno

Cada servicio ya tiene su archivo `.env` configurado:

### `/services/usuarios/.env`
```
PORT=5001
DATABASE_URL=postgresql://admin:secret123@localhost:5432/usuarios_db
```

### `/services/productos/.env`
```
PORT=5002
DATABASE_URL=postgresql://admin:secret123@localhost:5433/productos_db
```

### `/services/pedidos/.env`
```
PORT=5003
DATABASE_URL=postgresql://admin:secret123@localhost:5434/pedidos_db
```

**Nota:** Si usas Docker Compose, los hosts `localhost` funcionan automáticamente.

---

## 📡 Puertos y Endpoints

### Frontend
- **URL:** http://localhost:5173
- **Descripción:** Interfaz de usuario React

### Backend - Microservicios

#### Usuarios (5001)
- `GET /usuarios/` — Listar todos los usuarios
- `POST /usuarios/` — Crear nuevo usuario
  ```json
  {
    "nombre": "Juan",
    "email": "juan@example.com"
  }
  ```
- `GET /usuarios/<id>` — Obtener usuario por ID

#### Productos (5002)
- `GET /productos/` — Listar todos los productos
- `POST /productos/` — Crear nuevo producto
- `GET /productos/<id>` — Obtener producto por ID

#### Pedidos (5003)
- `GET /pedidos/` — Listar todos los pedidos
- `POST /pedidos/` — Crear nuevo pedido
- `GET /pedidos/<id>` — Obtener pedido por ID

---

## 🧪 Probar los Servicios

### Con curl

```bash
# Obtener usuarios
curl http://localhost:5001/usuarios/

# Crear usuario
curl -X POST http://localhost:5001/usuarios/ \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","email":"ana@example.com"}'

# Obtener productos
curl http://localhost:5002/productos/

# Obtener pedidos
curl http://localhost:5003/pedidos/
```

### Desde el navegador
- Accede a http://localhost:5173
- Navega a la sección de Usuarios
- Crea, visualiza y gestiona usuarios directamente desde la UI

---

## 📁 Estructura del Proyecto

```
tienda-microservicios/
├── docker-compose.yml          # Configuración de bases de datos PostgreSQL
├── README.md                   # Este archivo
│
├── front-end/                  # Frontend React + Vite
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── features/
│       │   ├── users/          # Funcionalidad de usuarios
│       │   ├── products/       # Funcionalidad de productos
│       │   └── pedidos/        # Funcionalidad de pedidos
│       └── shared/
│           └── components/
│
└── services/                   # Microservicios Python
    ├── usuarios/               # Servicio de usuarios (Puerto 5001)
    │   ├── app.py
    │   ├── models.py
    │   ├── routes.py
    │   ├── requirements.txt
    │   ├── .env
    │   └── users_env/          # Entorno virtual
    │
    ├── productos/              # Servicio de productos (Puerto 5002)
    │   ├── app.py
    │   ├── models.py
    │   ├── routes.py
    │   ├── requirements.txt
    │   ├── .env
    │   └── prducts_env/        # Entorno virtual
    │
    └── pedidos/                # Servicio de pedidos (Puerto 5003)
        ├── app.py
        ├── models.py
        ├── routes.py
        ├── requirements.txt
        ├── .env
        └── pedidos_env/        # Entorno virtual
```

---

## 🔧 Comandos Rápidos

### Iniciar TODO el sistema en un comando

```bash
# Terminal 1: Bases de datos
docker-compose up

# Terminal 2: Usuarios
cd services/usuarios && source users_env/Scripts/activate && python app.py

# Terminal 3: Productos
cd services/productos && source prducts_env/Scripts/activate && python app.py

# Terminal 4: Pedidos
cd services/pedidos && source pedidos_env/Scripts/activate && python app.py

# Terminal 5: Frontend
cd front-end && npm run dev
```

### Detener todo
- Presiona `Ctrl+C` en cada terminal
- Para Docker: `docker-compose down`

---

## ⚠️ Troubleshooting

### Error: "ConnectionRefusedError" en los microservicios

**Causa:** Las bases de datos no están corriendo.

**Solución:**
```bash
# Verificar que Docker está corriendo
docker-compose ps

# Si no aparecen los contenedores, iniciar:
docker-compose up -d
```

### Error: "Port already in use" (Puerto 5001/5002/5003)

**Causa:** Ya hay un servicio corriendo en ese puerto.

**Solución:**
```bash
# Buscar qué proceso usa el puerto
lsof -i :5001  # macOS/Linux
netstat -ano | findstr :5001  # Windows

# Matar el proceso (reemplaza PID)
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Error: "ModuleNotFoundError" en Python

**Causa:** Las dependencias no están instaladas.

**Solución:**
```bash
# Asegúrate de estar en el directorio del servicio
cd services/usuarios
source users_env/Scripts/activate

# Reinstalar dependencias
pip install --force-reinstall -r requirements.txt
```

### El frontend no ve los microservicios (Error CORS)

**Causa:** Los microservicios no tienen CORS habilitado o no están corriendo.

**Solución:**
1. Verifica que los 3 microservicios estén corriendo
2. Abre las DevTools del navegador (F12)
3. Revisa la pestaña "Network" para ver qué URLs se están llamando
4. Asegúrate de llamar a `http://127.0.0.1:PUERTO` (no `localhost`)

---

## 📚 Stack Tecnológico

### Frontend
- **React** 19.2.5
- **Vite** 8.0.9 (bundler)
- **Tailwind CSS** 4.2.4
- **Axios** 1.15.2
- **React Router** 7.14.2

### Backend
- **Python** 3.11
- **Flask** 3.1.3
- **Flask-SQLAlchemy** 3.1.1
- **Flask-CORS** 6.0.1
- **PostgreSQL** 15
- **psycopg2** 2.9.12

---

## 🤝 Notas Importantes

1. **Cada servicio tiene su propia BD:** Usuarios, Productos y Pedidos usan esquemas independientes.
2. **CORS habilitado:** Los microservicios aceptan peticiones desde http://localhost:5173.
3. **Entornos virtuales:** No modificar ni eliminar las carpetas `*_env`. Fueron preconfigurados.
4. **Hot reload:** El frontend con Vite recarga automáticamente los cambios. Los microservicios también tienen debug=True.
5. **Datos persistentes:** Con Docker Compose, los datos se guardan en volúmenes (`pgdata_*`).

---

## 📞 Contacto / Soporte

Si tienes problemas:
1. Revisa la sección **Troubleshooting**
2. Verifica que todos los puertos (5001-5003, 5173, 5432-5434) estén disponibles
3. Asegúrate de que Docker Compose está corriendo si usas contenedores
4. Comprueba los logs de cada terminal para mensajes de error específicos

---

## ✅ Checklist de Ejecución

- [ ] Docker Compose está corriendo: `docker-compose ps`
- [ ] Servicio Usuarios activo en http://127.0.0.1:5001/usuarios/
- [ ] Servicio Productos activo en http://127.0.0.1:5002/productos/
- [ ] Servicio Pedidos activo en http://127.0.0.1:5003/pedidos/
- [ ] Frontend corriendo en http://localhost:5173
- [ ] Puedo ver usuarios en la tabla
- [ ] Puedo crear un usuario desde el formulario
- [ ] Los datos persisten al recargar la página

¡Listo! El sistema está completamente operativo. 🎉
