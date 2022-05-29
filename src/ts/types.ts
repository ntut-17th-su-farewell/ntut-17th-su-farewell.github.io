import Router from "./Router"

export type State = {
  name: string | null
  authorized: boolean
  currentPath: string
  containerEl: HTMLDivElement
}

type Route = { html: string; onMount?: (router: Router) => void; onCleanup?: (router: Router) => void }
export type Routes = { [key: string]: Route }

export type MessageBox = { question: string; answer: string; messages: string[] }
