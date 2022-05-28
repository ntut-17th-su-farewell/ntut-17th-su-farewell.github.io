import Router from "./Router"
import routes from "./routes"
import state from "./state"

if (window.location.pathname == "/") history.replaceState({}, "", "name")

const containerEl = <HTMLDivElement>document.getElementById("container")!

const router = new Router({routes, state, containerEl})

router.onPathChange()
