import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";

export enum LoginTypeKeys {
  LOGIN_REQUEST = "@login/LOGIN_REQUEST",
  LOGIN_SUCCESS = "@login/LOGIN_SUCCESS",
  LOGIN_FAILURE = "@login/LOGIN_FAILURE",

  FIRST_ACCESS_REQUEST = "@login/FIRST_ACCESS_REQUEST",
  FIRST_ACCESS_SUCCESS = "@login/FIRST_ACCESS_SUCCESS",
  FIRST_ACCESS_FAILURE = "@login/FIRST_ACCESS_FAILURE",

  FORGOT_PASSWORD_REQUEST = "@login/FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS = "@login/FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILURE = "@login/FORGOT_PASSWORD_FAILURE",

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
  firstAccessFeedback: '' | 'error' | 'success'
}

export type LoginParams = {
  email: string;
  password: string
}

export type FirstAccessParams = {
  email: string;
  password: string;
  code: string
}


