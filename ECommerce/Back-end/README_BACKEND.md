# Backend — ECommerce (Instrucciones para ejecutar localmente y con Docker)

Este README está centrado exclusivamente en la carpeta `ECommerce` (backend Django). Contiene pasos mínimos para ejecutar el backend en una máquina de desarrollo y cómo levantar la base de datos PostgreSQL con Docker Compose.

Requisitos mínimos
- Git (opcional, para clonar el repo)
- Python 3.10+ (si vas a ejecutar Django localmente)
- Docker & Docker Compose (si vas a usar Docker para la base de datos)

Archivos relevantes
- `docker-compose.yml` — define un servicio `db` usando Postgres (está en la raíz de `ECommerce`).
- `.env` — variables de entorno usadas por Django (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT). Asegúrate de crear/editar este archivo.

1) Preparar el entorno (opción A: Docker DB + Django local)

A. Levantar PostgreSQL con Docker Compose (recomendado):

```bash
# desde la carpeta ECommerce
docker compose up -d
```

Esto levantará un contenedor `db` (Postgres) con los valores por defecto que aparecen en `docker-compose.yml`:
- POSTGRES_DB=ecommerce
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=postgres

El servicio expone el puerto `5432` en la máquina host, por lo que Django (ejecutado localmente) podrá conectarse a `localhost:5432`.

B. Crear/editar `.env` (ejemplo mínimo)

Coloca en `Ecommerce/.env` (o en la raíz del proyecto donde `settings.py` pueda leerlo):

```ini
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
# Opcional: DJANGO_SECRET_KEY, DEBUG
```

C. Crear y activar un entorno virtual (si ejecutas Django localmente)

Windows (PowerShell):
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

D. Instalar dependencias

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

E. Migraciones y datos iniciales

```bash
# Asegúrate que las variables de entorno (.env) están cargadas o visibles para el proceso
python manage.py makemigrations
python manage.py migrate
```

F. Crear superusuario (opcional)

```bash
python manage.py createsuperuser
```

G. Ejecutar servidor de desarrollo

```bash
python manage.py runserver 0.0.0.0:8000
```

La API quedará accesible en `http://localhost:8000/`.


2) Verificaciones y comandos útiles

```bash
python manage.py check
python manage.py showmigrations
python manage.py test apps.users
```

3) Notas específicas (importante)
- `ECommerce/settings.py` espera variables `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` (se usan con `python-decouple`). Asegúrate de que `.env` esté en la ruta donde Django lo lea.
- Si `docker compose up` expone Postgres en `localhost:5432`, no necesitas cambiar `DB_HOST` en `.env`.
- Si ya existe una base de datos con el mismo nombre/usuario, revisa los volúmenes y credenciales antes de levantar contenedores.

