import Router from "./Router"

export type State = {
  messageBox: MessageBox | null
  authorized: boolean
  currentPath: string
}

type Route = { html: string; onMount: (router: Router) => void; onCleanup?: (router: Router) => void }
export type Routes = { [key: string]: Route }

export type MessageBox = { question: string; answer: string; messages: string[] }
