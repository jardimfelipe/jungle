import { action } from "typesafe-actions";
import { UsersTypeKeys, User } from "./types";

export function getUsersRequest() {
  return action(UsersTypeKeys.GET_USERS_REQUEST);
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