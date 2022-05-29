declare module "*.html" {
  const value: string
  export default value
}

declare module "*message-boxes.json" {
  const value: { [key: string]: import("./types").MessageBox }
  export default value
}
