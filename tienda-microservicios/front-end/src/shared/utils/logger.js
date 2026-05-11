/*
  Código anterior (mejor esfuerzo, recuperado como comentario):

  // Ejemplos de uso de logging disperso antes del cambio:
  // console.log('Loaded users', users)
  // console.error('Fetch error', err)

  Ahora: `logger` centralizado que solo imprime en `import.meta.env.DEV`.
*/

const isDevelopment = import.meta.env.DEV

const log = (level, ...args) => {
  if (!isDevelopment) {
    return
  }

  const method = console[level] ?? console.log
  method(`[${level.toUpperCase()}]`, ...args)
}

export const logger = {
  debug: (...args) => log('log', ...args),
  info: (...args) => log('info', ...args),
  warn: (...args) => log('warn', ...args),
  error: (...args) => log('error', ...args),
}
