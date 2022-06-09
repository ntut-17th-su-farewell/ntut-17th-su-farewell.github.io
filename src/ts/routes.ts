import messageBoxes from "../data/message-boxes.json"
import EndingPage from "../html/ending.html"
import FeedbackPage from "../html/feedback.html"
import LandingPage from "../html/landing.html"
import MessagesPage from "../html/message.html"
import StartingPage from "../html/starting.html"
import { Route, Routes } from "./types"

export default {
  "": router =>
    new Route(LandingPage, "index-page", "index.png", () => {
      const name = (<HTMLInputElement>document.getElementById("name-input")).value
      const passcode = (<HTMLInputElement>document.getElementById("magic-word-input")).value

      if (!(name in messageBoxes)) {
        alert("名字輸入錯了 QAQ")
        return null
      }

      const messageBox = messageBoxes[name as keyof typeof messageBoxes]

      if (messageBox.passcode != passcode) {
        alert("通關密語錯了，偷看壞壞哦！")
        return null
      }

      // Cache background images
      for (let i = 1; i <= 4; i++) new Image().src = `/assets/img/backgrounds/${name}/${i}.webp`
      new Image().src = `/assets/img/backgrounds/ending.webp`

      const backgroundMusic = new Audio("/assets/audio/background-music.mp3")
      backgroundMusic.loop = true
      backgroundMusic.play()

      router.state.name = name
      router.state.messageBox = messageBox
      return "starting"
    }),
  starting: () => new Route(StartingPage, "page-with-text-content", "index.png", () => "messages"),
  messages: router => {
    let currentMessageIndex = 0
    let messageContainerEl: HTMLDivElement
    let messageContentEls: HTMLDivElement[]
    const messageBox = router.state.messageBox

    function displayNextMessage() {
      const currentMessageContentEl = messageContentEls[currentMessageIndex]
      // https://stackoverflow.com/a/31862081
      const triggerReflow = () => getComputedStyle(currentMessageContentEl).transform

      if (currentMessageIndex == 0) {
        currentMessageContentEl.style.transition = "none"
        triggerReflow()
        currentMessageContentEl.classList.remove("next")
        triggerReflow()
        currentMessageContentEl.style.transition = ""
      } else {
        messageContentEls[currentMessageIndex - 1].classList.add("previous")
        currentMessageContentEl.classList.remove("next")
      }

      router.setBackground(`${router.state.name}/${currentMessageIndex + 1}`)
    }

    if (messageBox == null) {
      router.push("name")
      return
    }

    return new Route(
      MessagesPage,
      "page-with-text-content",
      () => `${router.state.name}/1`,
      () => {
        currentMessageIndex++

        if (currentMessageIndex < messageBox.messages.length) {
          displayNextMessage()
          return null
        } else {
          return "ending"
        }
      },
      () => {
        messageContainerEl = document.getElementById("message-container") as HTMLDivElement

        messageContainerEl.innerHTML = messageBox.messages
          .map(
            message =>
              `<div class="message-content next">${message
                .split("\n\n")
                .map(paragraph => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
                .join("")}</div>`
          )
          .join("")

        messageContentEls = [...messageContainerEl.children] as HTMLDivElement[]

        const maximumHeight = messageContentEls.reduce((previousValue, messageContentEl) => {
          messageContentEl.style.height = "unset"
          const elHeight = messageContentEl.clientHeight
          messageContentEl.style.height = ""

          if (elHeight > previousValue) return elHeight
          else return previousValue
        }, 0)

        messageContainerEl.style.height = `${maximumHeight}px`
        displayNextMessage()
      }
    )
  },
  ending: () => new Route(EndingPage, "page-with-text-content", "ending", () => "feedback"),
  feedback: () => new Route(FeedbackPage, "page-with-text-content", "ending"),
} as Routes
