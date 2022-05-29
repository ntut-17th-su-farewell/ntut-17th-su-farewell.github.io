declare module "*.html" {
  const value: string
  export default value
}

declare module "*message-boxes.json" {
  type MessageBox = import('./types').MessageBox
  const value: { [key: string]: MessageBox }
  export default value
}
