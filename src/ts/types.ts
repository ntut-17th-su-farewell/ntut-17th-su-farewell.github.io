import Router from "./Router"

export type State = {
  name: string | null
  messageBox: MessageBox | null
  currentPath?: string
  containerEl: HTMLDivElement
}

export class Route {
  constructor(
    public html: string,
    public containerClass: string,
    public background: string | (() => string),
    public buttonClickHandler?: (router: Router) => string | null,
    public initialize?: () => void
  ) {}
}
export type Routes = { [key: string]: (router: Router) => Route | undefined }

export type MessageBox = { passcode: string; messages: string[] }
