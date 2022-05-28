import NamePage from "../html/name.html"
import QuestionPage from "../html/question.html"

import { state } from "./state.js"

const container = document.getElementById("container")

const route = {
  name: {
    html: NamePage,
    js: () => {
      document.getElementById("button").onclick = () => {
        state.name = document.getElementById("name-input").value
        routerPush("question")
      }
    },
  },
  question: {
    html: QuestionPage,
    js: () => {
      if (state.name == null) routerReplace("name")
      document.getElementById("button").onclick = () => {
        state.name = document.getElementById("name-input").value
        routerPush("question")
      }
    },
  },
}

function routerPush(path) {
  history.pushState({}, "", path)
  onPathChange()
}

function routerReplace(path) {
  history.pushState({}, "", path)
  onPathChange()
}

export function onPathChange() {
  const newPath = window.location.pathname.replace(/\//g, "")

  if (state.currentPath !== newPath) {
    const newRoute = route[newPath]
    container.innerHTML = newRoute.html
    newRoute.js()
  }
}
