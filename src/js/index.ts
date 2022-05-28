import Router from "./Router.js"
import route from "./route.js"
import  state from "./state.js"

if (window.location.pathname == "/") history.replaceState({}, "", "name")

const container = <HTMLDivElement>document.getElementById("container")!

const router = new Router(route,state, container)

router.onPathChange()
