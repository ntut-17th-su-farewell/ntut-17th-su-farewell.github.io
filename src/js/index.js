import { onPathChange } from "./route.js"

if (window.location.pathname == "/") history.replaceState({}, "", "name")

onPathChange()
