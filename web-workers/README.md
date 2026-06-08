# Web Workers con tematica del Universo

Este proyecto muestra de forma visual la diferencia entre procesar una tarea pesada en el hilo principal del navegador y delegarla a un Web Worker.

## Idea general

La app tiene tres elementos que se ejecutan al mismo tiempo cuando se carga un archivo CSV:

- un contador automático que incrementa cada segundo,
- la carga y parseo de un archivo CSV,
- una tarea pesada artificial de aproximadamente 5 segundos.

El objetivo es ver qué pasa con la interfaz cuando el procesamiento bloquea o no bloquea el hilo principal.

## Caso 1: sin Workers

Ruta: `/without-workers`

En este escenario, la lectura del CSV y la tarea pesada se ejecutan en el hilo principal dentro de `WithoutWorkers`.

### Qué ocurre

- el usuario selecciona un archivo `.csv`,
- se lee el archivo con `FileReader`,
- se simula una carga pesada con un `while` de 5 segundos,
- después se parsea el CSV y se renderiza la tabla.

### Efecto en la interfaz

Durante esos 5 segundos el navegador queda ocupado con el procesamiento. Eso hace que el contador se detenga temporalmente, porque el mismo hilo que debería actualizar la UI está ocupado con la tarea pesada.

### Qué demuestra

Este caso muestra el problema clásico de hacer trabajo costoso en el hilo principal:

- la interfaz se congela,
- las animaciones o actualizaciones se retrasan,
- la experiencia de usuario empeora aunque la tarea sí termine.

## Caso 2: con Workers

Ruta: `/with-workers`

En este escenario, el archivo CSV se envía a `csvWorker.js` mediante un Web Worker.

### Qué ocurre

- el usuario selecciona un archivo `.csv`,
- se lee el contenido con `FileReader`,
- el texto del CSV se manda al worker con `postMessage`,
- el worker ejecuta la misma tarea pesada de 5 segundos y parsea el archivo,
- cuando termina, devuelve los datos a la página principal.

### Efecto en la interfaz

Mientras el worker procesa el archivo, el contador sigue ejecutándose con normalidad. La UI no se bloquea porque el trabajo pesado se ejecuta fuera del hilo principal.

### Qué demuestra

Este caso muestra la ventaja de usar Web Workers para tareas intensivas:

- la interfaz permanece responsiva,
- el contador no se interrumpe,
- el procesamiento pesado no afecta la navegación ni el renderizado inmediato.

## Diferencia clave entre ambos casos

La diferencia no está en el resultado final de la tabla, sino en cómo se ejecuta el procesamiento.

- Sin Workers: el hilo principal hace todo y bloquea la UI.
- Con Workers: el procesamiento se delega y la UI sigue activa.

## Estructura de la demo

- `src/pages/WithoutWorkers.jsx`: caso sin worker.
- `src/pages/WithWorkers.jsx`: caso con worker.
- `src/workers/csvWorker.js`: lógica que corre en el Web Worker.
- `src/components/Contador.jsx`: contador automático.
- `src/components/InputFile.jsx`: selector de archivo CSV.
- `src/components/Table.jsx`: renderizado de la tabla.

## Cómo arrancar el proyecto

1. Abrir una terminal en la carpeta `web-workers`.
2. Instalar dependencias:

```bash
npm install
```

3. Levantar el entorno de desarrollo:

```bash
npm run dev
```

4. Abrir la URL que muestra Vite en el navegador.

## Cómo probarlo

1. En la pantalla inicial, entrar a la prueba con Workers o sin Workers.
2. Subir un archivo `.csv`(hay uno de prueba: Universe.csv).
3. Observar el contador mientras se procesa el archivo.
4. Comparar el comportamiento de la interfaz en ambos casos.

## Resultado esperado

- Con Workers: el contador sigue activo y la aplicación se siente fluida.
- Sin Workers: el contador se pausa mientras dura el procesamiento pesado.
