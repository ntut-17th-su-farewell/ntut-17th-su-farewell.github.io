import { ButtonClickHandler, Routes, State, StatefulButtonClickHandler } from "./types"

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

  onPathChange() {
    const newPath = window.location.pathname.replace(/\//g, "")

    if (this.state.currentPath != newPath) {
      const newRoute = this.routes[newPath]

      this.state.containerEl.className = newRoute.containerClass
      this.state.containerEl.innerHTML = newRoute.html
      this.setBackground(typeof newRoute.background == "string" ? newRoute.background : newRoute.background(this))

      if (newRoute.onButtonClick != undefined) {
        const buttonClickHandler = this.getButtonClickHandler(newRoute.onButtonClick)

        document.getElementById("button")!.onclick = () => {
          const newPath = buttonClickHandler(this)
          if (newPath !== null) this.push(newPath)
        }
      }

      this.state.currentPath = newPath
    }
  }

  setBackground(imagePath: string) {
    this.state.containerEl.style.backgroundImage = `url(img/backgrounds/${imagePath}.jpg)`
  }

  getButtonClickHandler(handler: any): ButtonClickHandler {
    try {
      const handlerInstance = new handler(this)
      return (handlerInstance as StatefulButtonClickHandler).run.bind(handlerInstance) ?? handler
    } catch (error: any) {
      if (error.name != "TypeError") throw error

      // handler is a arrow function
      return handler
    }
  }
}
