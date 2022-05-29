import messageBoxes from "../data/message-boxes.json"
import ByePage from "../html/bye.html"
import MessagesPage from "../html/message.html"
import NamePage from "../html/name.html"
import QuestionPage from "../html/question.html"
import { MessageBox, Routes } from "./types"

function findMessageBox(name: string): MessageBox {
  return messageBoxes[name as keyof typeof messageBoxes]
}

export default {
  name: {
    html: NamePage,
    onMount: router => {
      router.setBackground("name")
      router.state.containerEl.classList.add("input-container")

      document.getElementById("button")!.onclick = () => {
        const name = (<HTMLInputElement>document.getElementById("name-input")).value

        if (!Object.keys(messageBoxes).includes(name)) {
          alert("名字輸入錯了 QQ")
          return
        }

        router.state.name = name
        router.push("question")
      }
    },
    onCleanup: router => router.state.containerEl.classList.remove("input-container"),
  },
  question: {
    html: QuestionPage,
    onMount: router => {
      if (router.state.name == null) {
        router.replace("name")
        return
      }

      const messageBox = findMessageBox(router.state.name!)

      router.setBackground("question")
      router.state.containerEl.classList.add("input-container")
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
    onCleanup: router => router.state.containerEl.classList.remove("input-container"),
  },
  messages: {
    html: MessagesPage,
    onMount: router => {
      router.state.containerEl.classList.add("message-container")

      if (router.state.name == null) {
        router.replace("name")
        return
      }

      if (router.state.authorized == false) {
        router.replace("question")
        return
      }

      const messageBox = findMessageBox(router.state.name!)
      const messageEl = document.getElementById("message")!
      messageEl.innerHTML = messageBox.messages.map(message => `<div class="message-content">${message}</div>`).join("")
      const messageContentEls = messageEl.children

      let currentMessageIndex = 0
      const displayMessage = () => {
        if (currentMessageIndex > 0) messageContentEls[currentMessageIndex - 1].classList.add("previous")
        messageContentEls[currentMessageIndex].classList.remove("next")
        router.setBackground(`${router.state.name}/${currentMessageIndex + 1}`)
      }

      for (const children of messageContentEls) children.classList.add("next")
      displayMessage()

      document.getElementById("button")!.onclick = () => {
        currentMessageIndex++

        if (currentMessageIndex < messageBox.messages.length) {
          displayMessage()
        } else {
          router.push("bye")
        }
      }
    },
    onCleanup: router => router.state.containerEl.classList.remove("message-container"),
  },
  bye: {
    html: ByePage,
  },
} as Routes
