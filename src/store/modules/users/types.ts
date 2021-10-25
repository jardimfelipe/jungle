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
  CREATE_USERS_PROGRESS = "@user/CREATE_USERS_PROGRESS",

  DELETE_USERS_REQUEST = "@user/DELETE_USERS_REQUEST",
  DELETE_USERS_SUCCESS = "@user/DELETE_USERS_SUCCESS",
  DELETE_USERS_FAILURE = "@user/DELETE_USERS_FAILURE",

  RESET_USERS_ERRORS = "@user/RESET_USERS_ERRORS"
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
  department: string
  office: string
  active: boolean
}

export type UsersState = {
  users: User[];
  gestores: User[];
  admins: User[];
  userFileProgress: number;
  isFileLoading: boolean;
  isLoading: boolean;
  error: RequestError;
  fileSuccess: boolean;
}
 
export type GetUserParams = {
  headers: {
    company: string
  }
}

export type DeleteUserParams = {
  user: User;
  company?: string
}