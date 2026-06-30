# Front-end Ecommerce

Frontend desarrollado con React, Vite y React Router para un ecommerce con autenticacion basada en JWT y sesion global con Context API.

## Resumen

La autenticacion del proyecto fue evolucionada desde una validacion basica por token hacia una arquitectura centralizada con `AuthContext` y `AuthProvider`. Actualmente el frontend:

- inicia sesion contra el backend con JWT (`access` y `refresh`)
- guarda tokens en `localStorage`
- consulta `/users/me/` para obtener el usuario autenticado
- mantiene la sesion global con Context
- protege rutas privadas
- protege rutas por rol
- actualiza el header segun el estado real de autenticacion

## Flujo de autenticacion implementado

El flujo principal de login sigue este orden:

1. El usuario envia sus credenciales desde la pagina de login.
2. El contexto ejecuta `POST /auth/login/`.
3. Se almacenan `access` y `refresh` en `localStorage`.
4. Se consulta `GET /users/me/`.
5. Se guarda el usuario autenticado en el estado global.
6. La app actualiza `isAuthenticated` y los permisos derivados del rol.

Este enfoque evita depender solo de la existencia del token y permite trabajar con identidad real del usuario dentro de la interfaz.

## Piezas importantes implementadas

### `AuthContext` y `AuthProvider`

Se centralizo la sesion global en:

- `src/context/AuthContext.jsx`
- `src/context/AuthProvider.jsx`

Responsabilidades principales:

- guardar `user`
- manejar `isLoading`
- exponer `login` y `logout`
- restaurar la sesion al recargar la pagina
- derivar permisos como `isAdmin`, `isEmployee` e `isCustomer`

### `useAuth`

El hook `src/hooks/useAuth.js` actua como wrapper de `useContext(AuthContext)` para que cualquier componente pueda acceder de forma limpia al estado de autenticacion.

Ejemplos de uso:

- leer `isAuthenticated`
- obtener `user`
- ejecutar `login`
- ejecutar `logout`
- evaluar permisos por rol

### Capa API de autenticacion

En `src/features/Autentication/api/AuthApi.js` se centralizaron las llamadas relacionadas con autenticacion:

- `login(credentials)`
- `register(credentials)`
- `getMe()`

Esto permite desacoplar la logica de red del contexto y de las paginas.

### Axios con token automatico

En `src/api/client.js` se configuro un interceptor para adjuntar automaticamente el header:

`Authorization: Bearer <access_token>`

Gracias a esto, endpoints protegidos como `/users/me/` funcionan sin repetir headers manualmente en cada request.

## Persistencia de sesion

Al refrescar la pagina, el `AuthProvider` intenta reconstruir la sesion:

- lee el token `access` desde `localStorage`
- si existe, consulta `/users/me/`
- si la consulta funciona, restaura el usuario
- si falla, limpia la sesion local

Esto evita que el usuario pierda el estado autenticado en cada recarga.

## Proteccion de rutas

### `PrivateRoute`

Ubicado en `src/routes/PrivateRoute.jsx`.

Se usa para rutas que solo requieren que el usuario haya iniciado sesion. Evalua:

- `isLoading`
- `isAuthenticated`

Si no hay sesion valida, redirige a `/login`.

### `RoleRoute`

Ubicado en `src/routes/RoleRoute.jsx`.

Se usa para rutas que ademas de sesion requieren un rol permitido. Evalua:

- autenticacion
- estado de carga
- `user.role.name`

Si el rol no coincide con los roles permitidos, redirige al inicio.

## Roles manejados actualmente

En la implementacion actual se derivan permisos a partir de `user.role.name`:

- `Admin`
- `Employee`
- `Customer`

Esto permite mostrar u ocultar partes de la interfaz y restringir acceso segun el perfil autenticado.

## Integracion en la interfaz

El header publico (`src/components/Navbar/public/HeaderPublic.jsx`) ya consume el contexto para:

- mostrar "Iniciar Sesion" cuando no hay sesion
- mostrar datos del usuario autenticado
- mostrar accesos segun el rol
- permitir cerrar sesion con `logout()`

## Rutas ya integradas con autenticacion

En `src/routes/AppRouter.jsx` ya existen ejemplos funcionales de:

- ruta privada: `/cuenta`
- ruta protegida por rol: `/admin`

Estas rutas usan `PrivateRoute` y `RoleRoute` respectivamente.

## Estado actual de la arquitectura

La autenticacion ya no depende solo de hooks locales de formulario. La fuente principal de verdad es el contexto global.

Con esto el proyecto gana:

- mejor escalabilidad
- menos duplicacion de logica
- proteccion de rutas mas clara
- una sesion consistente en toda la app

## Notas

- `useRegister` sigue funcionando como hook de feature para registro.
- `useLogin` ya no deberia ser la fuente principal de la sesion; esa responsabilidad vive en `AuthProvider`.
- A futuro se puede mejorar el manejo de expiracion de tokens con refresh automatico y respuesta centralizada ante `401`.
