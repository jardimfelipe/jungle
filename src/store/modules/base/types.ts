import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export enum BaseKeys {
  SET_SIDEBAR_STATE = "@base/SET_SIDEBAR_STATE",
  SET_USERBAR_STATE = "@base/SET_USERBAR_STATE",
  SET_SNACKBAR_OPEN = "@base/SET_SNACKBAR_OPEN",
  SET_SNACKBAR_CLOSE = "@base/SET_SNACKBAR_CLOSE",
}

export type BaseState = {
  isSidebarOpen: boolean;
  isUserbarOpen: boolean;
  snackbar: {
    snackbarState: boolean;
    snackbarMessage: string;
  }
}

export type BaseAction = ActionType<typeof actions>;
