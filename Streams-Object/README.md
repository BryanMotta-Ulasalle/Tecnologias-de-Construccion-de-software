# Streams-Object

Breve informe del ejemplo presentado.

Descripción
- Ejemplo de pipeline en Node.js que procesa el archivo `ventas.csv` usando streams y un generador: parsea el CSV, filtra ventas con `cantidad > 0`, calcula el total por línea (`cantidad * precio_unitario`) y acumula los resultados.

Informe del ejemplo
- Entrada: `ventas.csv` (cabeceras esperadas: `fecha,producto,cantidad,precio_unitario`).
- Flujo: lectura por streams → parseo por generador → `Transform` para filtrar → `Transform` para calcular total → `Writable` que recolecta resultados.
- Salida: resumen con número de ventas procesadas, total general y detalle por venta (fecha, producto, cantidad y total).

Requisitos
- Node.js (versión moderna que incluya `stream/promises`, p. ej. Node 14+).

Uso
1. Abrir una terminal en la carpeta `Streams-Object`.
2. Ejecutar:

```bash
node pipeline.js
```

Salida esperada (formato)
- Mensajes: `Iniciando pipeline...`
- `Ventas procesadas: <n>` (cantidad válida procesada)
- `(1 descartada por cantidad = 0)` (mensajede muestra en este ejemplo)
- `Total general: $<total>`
- `Detalle:` seguido por líneas tipo: `YYYY-MM-DD | producto  | x<cantidad> | $<total>`

Notas
- El ejemplo es intencionalmente compacto para demostrar manejo de streams en modo objeto y transformaciones encadenadas.
