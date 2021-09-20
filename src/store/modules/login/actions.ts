import { action } from "typesafe-actions";
import { RequestError } from "../exportTypes";
import { FirstAccessParams, LoginParams, LoginTypeKeys } from "./types";

export function loginRequest(params: LoginParams) {
  return action(LoginTypeKeys.LOGIN_REQUEST, params);
}

export function loginSuccess(params: any) {
  return action(LoginTypeKeys.LOGIN_SUCCESS, params);
}

export function loginFailure(params: RequestError) {
  return action(LoginTypeKeys.LOGIN_FAILURE, params);
}

export function logout() {
  return action(LoginTypeKeys.LOGOUT);
}

export function getUserInfo() {
  return action(LoginTypeKeys.GET_USER_INFO);
}

export function firstAccessRequest(params: FirstAccessParams) {
  return action(LoginTypeKeys.FIRST_ACCESS_REQUEST)
}

export function firstAccessFailure() {
  return action(LoginTypeKeys.FIRST_ACCESS_FAILURE)
}

export function firstAccessSuccess() {
  return action(LoginTypeKeys.FIRST_ACCESS_SUCCESS)
}

export function resetStore() {
  return action(LoginTypeKeys.RESET_STORE)
}

