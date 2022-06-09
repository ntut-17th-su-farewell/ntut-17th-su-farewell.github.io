import { Routes, State } from "./types"

export default class Router {
  routes: Routes
  state: State

  constructor(routes: Routes, state: State) {
    this.routes = routes
    this.state = state

    this.push(window.location.pathname.replace(/^\/*(.*)\/*$/, "$1"))
  }

  push(path: string) {
    if (this.state.currentPath == path) return

    history.pushState({}, "", path)
    this.state.currentPath = path

    const newRoute = this.routes[path](this)

    if (newRoute == undefined) return

    this.state.containerEl.className = newRoute.containerClass
    this.state.containerEl.innerHTML = newRoute.html
    this.setBackground(typeof newRoute.background == "string" ? newRoute.background : newRoute.background())

    if (newRoute.initialize != undefined) newRoute.initialize()
    if (newRoute.buttonClickHandler != undefined) {
      document.getElementById("button")!.onclick = () => {
        const newPath = newRoute.buttonClickHandler!(this)
        if (newPath != null) this.push(newPath)
      }
    }
  }

  setBackground(imagePath: string) {
    this.state.containerEl.style.backgroundImage = `url(/assets/img/backgrounds/${
      imagePath.includes(".") ? imagePath : imagePath + ".webp"
    })`
  }
}
