import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";

export enum UsersTypeKeys {
  GET_USERS_REQUEST = "@user/GET_USERS_REQUEST",
  GET_USERS_SUCCESS = "@user/GET_USERS_SUCCESS",
  GET_USERS_FAILURE = "@user/GET_USERS_FAILURE",

  GET_GESTORES_REQUEST = "@user/GET_GESTORES_REQUEST",
  GET_GESTORES_SUCCESS = "@user/GET_GESTORES_SUCCESS",
  GET_GESTORES_FAILURE = "@user/GET_GESTORES_FAILURE",

  CREATE_USERS_REQUEST = "@user/CREATE_USERS_REQUEST",
  CREATE_USERS_SUCCESS = "@user/CREATE_USERS_SUCCESS",
  CREATE_USERS_FAILURE = "@user/CREATE_USERS_FAILURE",
}

export type UsersAction = ActionType<typeof actions>;

export type User = {
  age: string
  company: string
  cpf: string
  education: string
  email: string
  ethnicity: string
  genere: string
  house_time: string
  id: string
  marital_status: string
  name: string
  password_hash: string
  phone: string
  rne: string
  role: string
  sexual_orientation: string
  sons: string
  __v: string
  _id: string
}

export type UsersState = {
  users: User[];
  gestores: User[];
  admins: User[];
  isLoading: boolean;
  error: RequestError;
}

