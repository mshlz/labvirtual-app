export const delay = (miliseconds) =>
  new Promise((resolve) => setTimeout(resolve, miliseconds || 100))
