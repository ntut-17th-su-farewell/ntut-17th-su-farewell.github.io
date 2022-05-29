import { Routes, State } from "./types"

export default class Router {
  routes: Routes
  state: State

  constructor(routes: Routes, state: State) {
    this.routes = routes
    this.state = state
  }

  push(path: string) {
    history.pushState({}, "", path)
    this.onPathChange()
  }

  replace(path: string) {
    history.pushState({}, "", path)
    this.onPathChange()
  }

  onPathChange() {
    const newPath = window.location.pathname.replace(/\//g, "")

    if (this.state.currentPath != newPath) {
      const oldRoute = this.routes[this.state.currentPath]
      const newRoute = this.routes[newPath]

      if (oldRoute?.onCleanup != undefined) oldRoute.onCleanup(this)
      this.state.containerEl.innerHTML = newRoute.html
      if (newRoute?.onMount != undefined) newRoute.onMount(this)
    }
  }

  setBackground(imagePath: string) {
    this.state.containerEl.style.backgroundImage = `url(img/backgrounds/${imagePath}.jpg)`
  }
}
