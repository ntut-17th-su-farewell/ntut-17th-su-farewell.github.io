import { ButtonClickHandler, Routes, State } from "./types"

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
    console.log(newRoute)

    this.state.containerEl.className = newRoute.containerClass
    this.state.containerEl.innerHTML = newRoute.html
    this.setBackground(typeof newRoute.background == "string" ? newRoute.background : newRoute.background(this))

    if (newRoute.buttonClickHandler != undefined) {
      const buttonClickHandler = this.getButtonClickHandler(newRoute.buttonClickHandler)

      document.getElementById("button")!.onclick = () => {
        const newPath = buttonClickHandler(this)
        if (newPath != null) this.push(newPath)
      }
    }
  }

  setBackground(imagePath: string) {
    this.state.containerEl.style.backgroundImage = `url(img/backgrounds/${imagePath}.jpg)`
  }

  getButtonClickHandler(handler: any): ButtonClickHandler {
    const handlerPrototype = Object.getOwnPropertyDescriptor(handler, "prototype")

    // handlerPrototype == undefined if it is an arrow function
    if (handlerPrototype != undefined && handlerPrototype.writable == false) {
      const handlerInstance = new handler(this)
      return handlerInstance.run.bind(handlerInstance)
    } else {
      return handler
    }
  }
}
