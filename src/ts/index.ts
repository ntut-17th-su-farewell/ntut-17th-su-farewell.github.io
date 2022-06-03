import Router from "./Router"
import routes from "./routes"
import state from "./state"

const router = new Router(routes, state)

if (window.location.pathname == "/") {
  router.push("login")
} else {
  router.push(window.location.pathname.replace(/^\/*(.*)\/*$/, "$1"))
}
