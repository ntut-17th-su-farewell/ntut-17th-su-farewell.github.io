import Router from "./Router"
import routes from "./routes"
import state from "./state"

if (window.location.pathname == "/") history.replaceState({}, "", "name")

state.containerEl = <HTMLDivElement>document.getElementById("container")!

const router = new Router(routes)

router.onPathChange()
