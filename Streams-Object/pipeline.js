
const fs       = require('fs');         
const readline  = require('readline');  
const { Readable, Transform, Writable } = require('stream');
const { pipeline } = require('stream/promises');


async function* parsearCSV(rutaArchivo) {
 
  const archivoStream = fs.createReadStream(rutaArchivo, { encoding: 'utf8' });


  const rl = readline.createInterface({ input: archivoStream });

  let cabeceras = null;

  for await (const linea of rl) {
    if (!cabeceras) {
      
      cabeceras = linea.split(',');
      continue; 
    }

    const valores = linea.split(',');
    const obj = {};
    cabeceras.forEach((col, i) => { obj[col] = valores[i]; });

    yield obj;
  }
}


const filtrarVentas = new Transform({
  objectMode: true,  
  transform(venta, _enc, callback) {
    if (Number(venta.cantidad) > 0) {
      this.push(venta); 
    }
  
    callback(); 
  }
});


const calcularTotal = new Transform({
  objectMode: true,
  transform(venta, _enc, callback) {
    const cantidad = Number(venta.cantidad);
    const precio   = Number(venta.precio_unitario);

    this.push({
      ...venta,         
      cantidad,        
      precio_unitario: precio,
      total: cantidad * precio  
    });
    callback();
  }
});


const resultados = [];

const recolectar = new Writable({
  objectMode: true,
  write(venta, _enc, callback) {
    resultados.push(venta);
    callback();
  }
});


async function main() {
  console.log('Iniciando pipeline...\n');

  await pipeline(
    Readable.from(parsearCSV('ventas.csv')),
    filtrarVentas,
    calcularTotal,
    recolectar
  );


  console.log(`Ventas procesadas: ${resultados.length}`);
  console.log(`(1 descartada por cantidad = 0)\n`);

  const totalGeneral = resultados.reduce((acc, v) => acc + v.total, 0);
  console.log(`Total general: $${totalGeneral.toFixed(2)}\n`);

  console.log('Detalle:');
  resultados.forEach(v => {
    console.log(`  ${v.fecha} | ${v.producto.padEnd(8)} | x${v.cantidad} | $${v.total}`);
  });
}

main().catch(err => {
  console.error('Error:', err.message);
});