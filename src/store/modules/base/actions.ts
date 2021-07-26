import { action } from "typesafe-actions";
import { BaseKeys } from "./types";

export function setSidebarState(state: boolean) {
  return action(BaseKeys.SET_SIDEBAR_STATE, state);
}

export function setUserbarState(state: boolean) {
  return action(BaseKeys.SET_USERBAR_STATE, state);
}

export function setSnackbarOpen(message: string) {
  return action(BaseKeys.SET_SNACKBAR_OPEN, message)
}

export function setSnackbarClose() {
  return action(BaseKeys.SET_SNACKBAR_CLOSE)
}