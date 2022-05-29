import NamePage from "../html/name.html"
import QuestionPage from "../html/question.html"
import { Routes } from "./types"
import messages from "../data/messages.json"

messages
export default {
  name: {
    html: NamePage,
    initialize: router => {
      router.setBackground("name")

      document.getElementById("button")!.onclick = () => {
        router.state.name = (<HTMLInputElement>document.getElementById("name-input")).value
        router.push("question")
      }
    },
  },
  question: {
    html: QuestionPage,
    initialize: router => {
      if (router.state.name == null) {
        router.replace("name")
        return
      }

      router.setBackground("name")

      document.getElementById("button")!.onclick = () => {
        router.state.name = (<HTMLInputElement>document.getElementById("name-input")).value
        router.push("messages")
      }
    },
  },
} as Routes
