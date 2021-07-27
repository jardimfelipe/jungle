import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
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
    const gestores = data.filter(({ role }: User) => role === 'gestor')
    yield put(actions.getGestoresSuccess(gestores));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

function* createUsers({ payload }: ActionType<typeof actions.createUsersRequest>) {
  try {
    yield call(api, "/users", { method: 'POST', data: payload })
    yield put(actions.createUsersSuccess())
  } catch (error) {
    yield put(actions.createUsersFailure())
  }
}

export default all([takeLatest(UsersTypeKeys.GET_USERS_REQUEST, getUsers), takeLatest(UsersTypeKeys.GET_GESTORES_REQUEST, getGestores), takeLatest(UsersTypeKeys.CREATE_USERS_REQUEST, createUsers)]);
