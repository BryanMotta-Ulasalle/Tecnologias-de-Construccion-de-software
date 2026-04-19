# Informe del Proyecto: i18n-form

Fecha: 19 de abril de 2026

## 1. Resumen Ejecutivo

`i18n-form` es una aplicacion frontend construida con React y Vite que implementa un formulario de registro con soporte multilenguaje (espanol/ingles) mediante `i18next` y `react-i18next`. El proyecto permite cambiar idioma en tiempo real y persistir la preferencia del usuario en `localStorage`.

El alcance actual es adecuado para una practica academica o una base inicial de producto, con una estructura clara y dependencias modernas. Sin embargo, existen oportunidades de mejora en validacion, accesibilidad, mantenibilidad y experiencia de usuario.

## 2. Objetivo Funcional del Proyecto

El sistema busca resolver tres necesidades principales:

- Captura de datos basicos de registro (`name`, `email`).
- Validacion de campos en cliente antes del envio.
- Internacionalizacion de textos de interfaz y mensajes de error.

## 3. Stack Tecnologico

- Build tool: `Vite 8`
- Libreria UI: `React 19`
- Internacionalizacion: `i18next` + `react-i18next`
- Estilos: `Tailwind CSS 4` (via `@tailwindcss/vite`)
- Linting: `ESLint 9`

Scripts disponibles en `package.json`:

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de produccion
- `npm run lint`: analisis estatico
- `npm run preview`: previsualizacion del build

## 4. Arquitectura y Estructura

Estructura principal observada:

- `src/main.jsx`: punto de entrada; monta React e inicializa i18n.
- `src/App.jsx`: contenedor principal; compone selector de idioma + formulario.
- `src/i18n.js`: configuracion de recursos de traduccion, idioma inicial y persistencia.
- `src/components/Form.jsx`: formulario, validaciones y renderizado de errores.
- `src/components/LanguajeSelector.jsx`: selector de idioma (nombre con typo en archivo).
- `src/index.css`: importacion de Tailwind.

Patron general: aplicacion SPA pequena, orientada a componentes, con estado local en `useState` para formulario y errores.

## 5. Flujo Funcional Actual

1. La aplicacion carga y toma el idioma desde `localStorage` (`lang`) o usa `es` por defecto.
2. El usuario puede cambiar idioma con un `select`.
3. El evento `languageChanged` persiste el idioma en `localStorage`.
4. En el formulario, al enviar:
   - Se valida nombre con regex (solo letras/espacios, minimo 3).
   - Se valida email con regex basica.
   - Si hay errores, se muestran mensajes traducidos.
   - Si todo es valido, se muestra un `alert(" OK")`.

## 6. Fortalezas Detectadas

- Integracion de i18n simple y correcta para el alcance.
- Persistencia de idioma implementada.
- Separacion basica de responsabilidades por componente.
- Validacion de entradas con retroalimentacion visual.
- Uso de herramientas actuales (React 19, Vite 8, Tailwind 4).

## 7. Riesgos y Aspectos a Mejorar

### 7.1 UX y comportamiento

- El resultado exitoso usa `alert(" OK")`, mensaje poco descriptivo y no internacionalizado.
- El selector de idioma no define valor controlado (`value`), por lo que no refleja explicitamente el idioma actual al cargar.

### 7.2 Internacionalizacion

- Actualmente no hay namespace ni separacion de archivos de traduccion por modulo.
- Solo existen dos idiomas y pocas claves; puede crecer desordenadamente si no se modulariza.

### 7.3 Validaciones

- La regex del nombre permite solo caracteres ASCII (`a-zA-Z`), excluyendo nombres validos con acentos o caracteres internacionales (ej.: "Jose", "Nunez", "Muller").
- El campo email usa `type="text"` en lugar de `type="email"`.

### 7.4 Accesibilidad

- Los `label` no estan enlazados con `htmlFor`/`id`.
- Falta considerar atributos ARIA para mensajes de error y estados invalidos.

### 7.5 Mantenibilidad y consistencia

- Nombre de archivo/componente con typo: `LanguajeSelector.jsx` (deberia ser `LanguageSelector.jsx`).
- No hay pruebas automatizadas (unitarias o de integracion).

## 8. Recomendaciones Priorizadas

### Alta prioridad

- Reemplazar `alert(" OK")` por feedback en UI traducido y claro (exito/fallo).
- Convertir campo de correo a `type="email"`.
- Mejorar validacion de nombre para caracteres Unicode.
- Corregir typo en nombre de componente/archivo (`LanguajeSelector` -> `LanguageSelector`).

### Media prioridad

- Hacer el selector de idioma controlado con el idioma activo (`i18n.language`).
- Vincular `label` con `input` (`htmlFor` + `id`).
- Agregar `aria-invalid`, `aria-describedby` y region para errores.

### Baja prioridad (escalabilidad)

- Externalizar traducciones en archivos por idioma y/o namespace.
- Incorporar pruebas con React Testing Library + Vitest.
- Definir convenciones de i18n y validacion en una guia breve del proyecto.

## 9. Estado General del Proyecto

Evaluacion global: **Bueno (base funcional solida para evolucion)**.

El proyecto cumple su objetivo principal de demostracion de formulario internacionalizado con validaciones basicas. Para un entorno de produccion o entrega final robusta, se recomienda aplicar las mejoras de prioridad alta y media en la siguiente iteracion.

## 10. Siguiente Iteracion Sugerida (Sprint corto)

Alcance propuesto para un sprint de mejora:

1. Ajustes de UX y accesibilidad del formulario.
2. Refactor del selector de idioma y correccion de naming.
3. Mejoras de validacion internacional.
4. Agregar pruebas minimas de regresion para i18n y validaciones.

Con este sprint, el proyecto pasaria de una base academica funcional a una version significativamente mas mantenible y cercana a estandares de calidad de frontend profesional.
