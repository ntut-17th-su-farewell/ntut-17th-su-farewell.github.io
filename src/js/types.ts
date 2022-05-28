import Router from "./Router"

export type State = {
  name: string | null
  authorized: boolean
  currentPath: string
}

type Route = { html: string; initialize: (router: Router) => void }
export type Routes = { [key: string]: Route }
