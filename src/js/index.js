import route from "./route.js"

if (window.location.pathname == "/") history.replaceState({}, "", "name")

const container = document.getElementById("container")
let currentPath = null

function onStateChange() {
  const newPath = window.location.pathname.replace(/\//g, "")

  if (currentPath !== newPath) {
    const newRoute = route[newPath]
    container.innerHTML = newRoute.html
    newRoute.js()
  }
}

onStateChange()
