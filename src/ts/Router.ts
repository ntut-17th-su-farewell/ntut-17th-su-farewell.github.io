import { ButtonClickHandler, Routes, State } from "./types"

function getButtonClickHandler(handler: any): ButtonClickHandler {
  const anInstance = new handler()
  return anInstance.run ?? handler
}

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
      console.log(this.routes)

      this.state.containerEl.className = newRoute.containerClass
      this.state.containerEl.innerHTML = newRoute.html
      this.setBackground(typeof newRoute.background == "string" ? newRoute.background : newRoute.background(this))

      if (newRoute.onButtonClick != undefined) {
        const buttonClickHandler = getButtonClickHandler(newRoute.onButtonClick)

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
}
