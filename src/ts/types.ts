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

export abstract class Route {
  abstract html: string
  abstract background: string | ((router: Router) => string)
  abstract containerClass: string
  buttonClickHandler?: ButtonClickHandler
  initialize?: () => void
}
export type Routes = { [key: string]: new (router: Router) => Route }

export type MessageBox = { passcode: string; messages: string[] }
