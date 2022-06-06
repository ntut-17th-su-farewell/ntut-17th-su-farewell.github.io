import { ButtonClickHandler, Route, RouteClass, Routes, State } from "./types"

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

    const newRoute = this.routes[path]

    this.state.containerEl.className = newRoute.containerClass
    this.state.containerEl.innerHTML = newRoute.html
    this.setBackground(typeof newRoute.background == "string" ? newRoute.background : newRoute.background(this))

    const buttonClickHandler = this.getButtonClickHandler(newRoute as Route & RouteClass)

    document.getElementById("button")!.onclick = () => {
      const newPath = buttonClickHandler(this)
      if (newPath != null) this.push(newPath)
    }
  }

  setBackground(imagePath: string) {
    this.state.containerEl.style.backgroundImage = `url(img/backgrounds/${
      imagePath.includes(".") ? imagePath : imagePath + ".jpg"
    })`
  }

  getButtonClickHandler(route: Route & RouteClass): ButtonClickHandler {
    if (Object.getOwnPropertyDescriptor(route, "prototype")?.writable) {
      const routeInstance = new route(this)
      return routeInstance.buttonClickHandler
    } else {
      return route.buttonClickHandler ?? (() => null)
    }
  }
}
