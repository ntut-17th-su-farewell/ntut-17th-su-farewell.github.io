import messageBoxes from "../data/message-boxes.json"
import EndingPage from "../html/ending.html"
import LoginPage from "../html/login.html"
import MessagesPage from "../html/message.html"
import StartingPage from "../html/starting.html"
import Router from "./Router"
import { MessageBox, Routes } from "./types"

function findMessageBox(name: string): MessageBox {
  return messageBoxes[name as keyof typeof messageBoxes]
}

export default {
  login: {
    html: LoginPage,
    background: "index",
    onButtonClick: router => {
      const name = (<HTMLInputElement>document.getElementById("name-input")).value
      const secretWords = (<HTMLInputElement>document.getElementById("magic word")).value

      if (!Object.keys(messageBoxes).includes(name)) {
        alert("名字輸入錯了 QQ")
        return
      }

      if (findMessageBox(name).secretWords != secretWords) {
        alert("通關密語錯了，偷看壞壞哦")
        return
      }

      router.state.name = name
      return "starting"
    },
    containerClass: "input-container"
  },
  starting: {
    html: StartingPage,
    background: "index",
    onButtonClick: () => "messages",
    containerClass: "message-container"
  },
  messages: {
    html: MessagesPage,
    background: router => `${router.state.name}/1`,
    onButtonClick: class MessageButtonClickHandler {
      currentMessageIndex = 0
      messageBox: MessageBox
      messageContentEls: HTMLCollection
      router: Router

      constructor(router: Router) {
        const messageBox = findMessageBox(router.state.name!)
        const messageEl = document.getElementById("message")!
        messageEl.innerHTML = messageBox.messages
          .map(
            message =>
              `<div class="message-content">${message
                .split("\n")
                .map(line => `<p>${line}</p>`)
                .join("")}</div>`
          )
          .join("")
        const messageContentEls = messageEl.children

        for (const children of messageContentEls) children.classList.add("next")
        this.displayNextMessage()

        this.messageBox = messageBox
        this.messageContentEls = messageContentEls
        this.router = router
      }

      displayNextMessage() {
        if (this.currentMessageIndex > 0) this.messageContentEls[this.currentMessageIndex - 1].classList.add("previous")
        this.messageContentEls[this.currentMessageIndex].classList.remove("next")
        this.router.setBackground(`${this.router.state.name}/${this.currentMessageIndex + 1}`)
      }

      run() {
        if (this.currentMessageIndex < this.messageBox.messages.length) {
          this.displayNextMessage()
          return null
        } else {
          return "bye"
        }
      }
    },
    containerClass: "message-container"
  },
  bye: {
    html: EndingPage,
    background: "ending",
    containerClass: "message-container"
  },
} as Routes
