import Router from "./Router"

export type State = {
  name: string | null
  currentPath: string
  containerEl: HTMLDivElement
}

export type ButtonClickHandler = (router: Router) => string | null
export abstract class StatefulButtonClickHandler {
  abstract run: ButtonClickHandler
}

type Route = {
  html: string
  background: string | ((router: Router) => string)
  buttonClickHandler?: ButtonClickHandler | { new (args: any): StatefulButtonClickHandler }
  containerClass: string
}
export type Routes = { [key: string]: Route }

export type MessageBox = { secretWords: string; messages: string[] }
