import { Routes, State } from "./types"

export default class Router {
  routes: Routes
  state: State
  containerEl: HTMLDivElement

  constructor({ routes, state, containerEl }: { routes: Routes; state: State; containerEl: HTMLDivElement }) {
    this.routes = routes
    this.state = state
    this.containerEl = containerEl
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
      this.containerEl.innerHTML = newRoute.html
      newRoute.initialize(this)
    }
  }

  setBackground(imagePath: string) {
    this.containerEl.style.backgroundImage = `url(img/background/${imagePath}.jpg)`
    console.log(getComputedStyle(this.containerEl).backgroundImage)
  }
}
