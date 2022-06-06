import Router from "./Router"

export type State = {
  name: string | null
  currentPath?: string
  containerEl: HTMLDivElement
}

export type ButtonClickHandler = (router: Router) => string | null
export abstract class StatefulButtonClickHandler {
  abstract run: ButtonClickHandler
}

export interface Route {
  html: string
  background: string | ((router: Router) => string)
  containerClass: string
  buttonClickHandler?: ButtonClickHandler
}
export type Routes = { [key: string]: new (router: Router) => Route }

export type MessageBox = { passcode: string; messages: string[] }
