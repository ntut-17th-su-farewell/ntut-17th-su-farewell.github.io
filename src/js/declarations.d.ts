declare module "*.html" {
  const value: string
  export default value
}

declare module "../data/messages.json" {
  const value: { [key: string]: import('./types').Message }
  export default value
}
