import NamePage from "../html/name.html"
import QuestionPage from "../html/question.html"
import { Routes } from "./types.js"

export default  {
  name: {
    html: NamePage,
    initialize: (router) => {
      document.getElementById("button")!.onclick = () => {
        router.state.name = (<HTMLInputElement>document.getElementById("name-input")).value
        router.push("question")
      }
    },
  },
  question: {
    html: QuestionPage,
    initialize: (router) => {
      if (router.state.name == null) {
        router.replace("name")
        return
      }

      document.getElementById("button")!.onclick = () => {
        router.state.name = (<HTMLInputElement>document.getElementById("name-input")).value
        router.push("question")
      }
    },
  },
} as Routes
