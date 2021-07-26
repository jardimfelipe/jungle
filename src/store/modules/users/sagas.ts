import { takeLatest, all, call, put } from "redux-saga/effects";
import api from "../../../services/api";
import * as actions from "./actions";
import { User, UsersTypeKeys } from "./types";

function* getUsers() {
  try {
    const { data } = yield call(api, "/users");
    yield put(actions.getUsersSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

function* getGestores() {
  try {
    const { data } = yield call(api, "/users");
    console.log(data)
    const gestores = data.filter(({ role }: User) => role === 'gestor')
    console.log(gestores)
    yield put(actions.getGestoresSuccess(gestores));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

export default all([takeLatest(UsersTypeKeys.GET_USERS_REQUEST, getUsers), takeLatest(UsersTypeKeys.GET_GESTORES_REQUEST, getGestores)]);
