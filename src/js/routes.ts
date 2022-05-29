import messageBoxes from "../data/message-boxes.json"
import MessagesPage from "../html/messages.html"
import NamePage from "../html/name.html"
import QuestionPage from "../html/question.html"
import {  Routes } from "./types"

export default {
  name: {
    html: NamePage,
    onMount: router => {
      router.setBackground("name")
      router.containerEl.classList.add("input-container")

      document.getElementById("button")!.onclick = () => {
        const name = (<HTMLInputElement>document.getElementById("name-input")).value

        if (!Object.keys(messageBoxes).includes(name)) {
          alert("名字輸入錯了 QQ")
          return
        }

        router.state.messageBox = messageBoxes[name as keyof typeof messageBoxes]
        router.push("question")
      }
    },
    onCleanup: router => router.containerEl.classList.remove("input-container"),
  },
  question: {
    html: QuestionPage,
    onMount: router => {
      const messageBox = router.state.messageBox

      if (messageBox == null) {
        router.replace("name")
        return
      }

      router.setBackground("question")
      router.containerEl.classList.add("input-container")
      document.getElementById("question")!.innerText = messageBox.question

      document.getElementById("button")!.onclick = () => {
        const answer = (<HTMLInputElement>document.getElementById("answer-input")).value

        if (answer != messageBox.answer) {
          alert("答案錯了")
          return
        }

        router.state.authorized = true
        router.push("messages")
      }
    },
    onCleanup: router => router.containerEl.classList.remove("input-container"),
  },
  messages: {
    html: MessagesPage,
    onMount: router => {},
    onCleanup: router => router.containerEl.classList.remove("input-container"),
  },
} as Routes
