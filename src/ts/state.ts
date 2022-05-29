import { State } from "./types"

export default {
  name: null,
  authorized: false,
  currentPath: "",
  containerEl: <HTMLDivElement>document.getElementById("container")!,
} as State
