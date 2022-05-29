import state from "./state"
import { Routes } from "./types"

export default class Router {
  routes: Routes

  constructor(routes: Routes) {
    this.routes = routes
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

    if (state.currentPath != newPath) {
      const oldRoute = this.routes[state.currentPath]
      const newRoute = this.routes[newPath]

      if (oldRoute?.onCleanup != undefined) oldRoute.onCleanup(this)
      state.containerEl.innerHTML = newRoute.html
      if (newRoute?.onMount != undefined) newRoute.onMount(this)
    }
  }

  setBackground(imagePath: string) {
    state.containerEl.style.backgroundImage = `url(img/backgrounds/${imagePath}.jpg)`
  }
}
