export const logger = {
  debug: (...args) => {
    if (import.meta.env.DEV) {
      console.debug(...args)
    }
  },
  error: (...args) => {
    console.error(...args)
  },
}
