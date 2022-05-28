import { AppState, Routes } from "./types.js"

export default class Router {
  routes: Routes
  state: AppState
  container: HTMLDivElement

  constructor(routes: Routes, state: AppState, container: HTMLDivElement) {
    this.routes = routes
    this.state = state
    this.container = container
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

    if (this.state.currentPath !== newPath) {
      const newRoute = this.routes[newPath]
      this.container.innerHTML = newRoute.html
      newRoute.initialize(this)
    }
  }
}
