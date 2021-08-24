import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";

export enum LoginTypeKeys {
  LOGIN_REQUEST = "@login/LOGIN_REQUEST",
  LOGIN_SUCCESS = "@login/LOGIN_SUCCESS",
  LOGIN_FAILURE = "@login/LOGIN_FAILURE",
  GET_USER_INFO = "@login/GET_USER_INFO",
  LOGOUT = "@login/LOGOUT",
  RESET_STORE = "@login/RESET_STORE"
}

export type LoginAction = ActionType<typeof actions>;
export type UserRoles = 'user' | 'gestor' | 'master' | 'admin_jungle' | ''

export type LoginState = {
  currentUser: {
    email: string;
    name: string;
    role: UserRoles;
    _id: string
    company: string
  };
  isLoading: boolean;
  isLoggedIn: boolean;
  error: RequestError;
}

export type LoginParams = {
  email: string;
  password: string
}