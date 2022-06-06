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

export type Route = {
  html: string
  background: string | ((router: Router) => string)
  buttonClickHandler?: ButtonClickHandler
  containerClass: string
}
export type RouteClass = Route & { new (route: Router): Route & { buttonClickHandler: ButtonClickHandler } }
export type Routes = { [key: string]: Route | RouteClass }

export type MessageBox = { passcode: string; messages: string[] }
