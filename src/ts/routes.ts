import messageBoxes from "../data/message-boxes.json"
import EndingPage from "../html/ending.html"
import LandingPage from "../html/landing.html"
import MessagesPage from "../html/message.html"
import StartingPage from "../html/starting.html"
import Router from "./Router"
import { MessageBox, Route, Routes } from "./types"

function findMessageBox(name: string): MessageBox {
  return messageBoxes[name as keyof typeof messageBoxes]
}

export default {
  "": class implements Route {
    html = LandingPage
    background = "index.png"
    containerClass = "index-page"

    constructor(private router: Router) {}

    buttonClickHandler() {
      const name = (<HTMLInputElement>document.getElementById("name-input")).value
      const passcode = (<HTMLInputElement>document.getElementById("magic-word-input")).value

      if (!Object.keys(messageBoxes).includes(name)) {
        alert("名字輸入錯了 QAQ")
        return null
      }

      if (findMessageBox(name).passcode != passcode) {
        alert("通關密語錯了，偷看壞壞哦！")
        return null
      }

      // Cache background images
      for (let i = 1; i <= 4; i++) new Image().src = `img/backgrounds/${name}/${i}.jpg`
      new Image().src = `img/backgrounds/ending.jpg`

      const backgroundMusic = new Audio("/music/background-music.mp3")
      backgroundMusic.loop = true
      backgroundMusic.play()

      this.router.state.name = name
      return "starting"
    }
  },
  starting: class implements Route {
    html = StartingPage
    background = "index.png"
    containerClass = "message-page"
    buttonClickHandler = () => "messages"
  },
  messages: class {
    html = MessagesPage
    background = (router: Router) => `${router.state.name}/1`
    containerClass = "message-page"

    currentMessageIndex = 0
    messageBox: MessageBox | undefined
    messageContentEls: HTMLDivElement[] | undefined

    constructor(private router: Router) {}

    displayNextMessage() {
      const currentMessageContentEl = this.messageContentEls![this.currentMessageIndex]
      // https://stackoverflow.com/a/31862081
      const triggerReflow = () => getComputedStyle(currentMessageContentEl).transform

      if (this.currentMessageIndex == 0) {
        currentMessageContentEl.style.transition = "none"
        triggerReflow()
        currentMessageContentEl.classList.remove("next")
        triggerReflow()
        currentMessageContentEl.style.transition = ""
      } else {
        this.messageContentEls![this.currentMessageIndex - 1].classList.add("previous")
        currentMessageContentEl.classList.remove("next")
      }

      this.router.setBackground(`${this.router.state.name}/${this.currentMessageIndex + 1}`)
    }

    initialize() {
      const messageBox = findMessageBox(this.router.state.name!)
      const messageContainerEl = document.getElementById("message-container") as HTMLDivElement

      messageContainerEl.innerHTML = messageBox.messages
        .map(
          message =>
            `<div class="message-content next">${message
              .split("\n\n")
              .map(paragraph => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
              .join("")}</div>`
        )
        .join("")

      const messageContentEls = [...messageContainerEl.children] as HTMLDivElement[]
      const maximumHeight = messageContentEls.reduce((previousValue, messageContentEl) => {
        messageContentEl.style.height = "unset"
        const elHeight = messageContentEl.clientHeight
        messageContentEl.style.height = ""

        if (elHeight > previousValue) return elHeight
        else return previousValue
      }, 0)

      messageContainerEl.style.height = `${maximumHeight}px`

      this.messageBox = messageBox
      this.messageContentEls = messageContentEls

      // this.displayNextMessage() requires this.messageContentEls
      this.displayNextMessage()
    }

    buttonClickHandler() {
      this.currentMessageIndex++
      if (this.currentMessageIndex < this.messageBox!.messages.length) {
        this.displayNextMessage()
        return null
      } else {
        return "ending"
      }
    }
  },
  ending: class implements Route {
    html = EndingPage
    background = "ending"
    containerClass = "message-page"
  },
} as Routes
