import { action } from "typesafe-actions";
import { UsersTypeKeys, User, GetUserParams } from "./types";

export function getUsersRequest(params?: GetUserParams) {
  return action(UsersTypeKeys.GET_USERS_REQUEST, params);
}

export function getUsersSuccess(params: User[]) {
  return action(UsersTypeKeys.GET_USERS_SUCCESS, params);
}

export function getGestoresRequest() {
  return action(UsersTypeKeys.GET_GESTORES_REQUEST);
}

export function getGestoresSuccess(params: User[]) {
  return action(UsersTypeKeys.GET_GESTORES_SUCCESS, params);
}

export function createUsersRequest(params: FormData) {
  return action(UsersTypeKeys.CREATE_USERS_REQUEST, params)
}

export function createUsersSuccess() {
  return action(UsersTypeKeys.CREATE_USERS_SUCCESS)
}

export function createUsersFailure(params: string) {
  return action(UsersTypeKeys.CREATE_USERS_FAILURE, params)
}

export function createUsersProgress(params: number) {
  return action(UsersTypeKeys.CREATE_USERS_PROGRESS, params)
}

export function resetUsersErrors() {
  return action(UsersTypeKeys.RESET_USERS_ERRORS)
}