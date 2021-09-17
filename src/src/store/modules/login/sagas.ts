import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import { LoginState, LoginTypeKeys } from "./types";
import * as actions from "./actions";

import api from "../../../services/api";
import jwtDecode from "jwt-decode";
import { getSavedState, saveState } from "../../../utils/localStorage";

function* login({ payload }: ActionType<typeof actions.loginRequest>) {
  try {
    const { data } = yield call(api, "/authorize", { method: 'POST', data: { ...payload } });
    saveState('auth.token', data.token)
    saveState('auth.role', data.user.role)
    yield put(actions.loginSuccess(data.user));
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.loginFailure({ status: true, message: 'E-mail ou senha inválidos' }));
    }
  }
}

function* getUserInfo() {
  const token = getSavedState('auth.token')
  const decodeToken: LoginState["currentUser"] = jwtDecode(token)
  const userInfo = { ...decodeToken, role: getSavedState('auth.role') }
  yield put(actions.loginSuccess(userInfo));
}

export default all([takeLatest(LoginTypeKeys.LOGIN_REQUEST, login), takeLatest(LoginTypeKeys.GET_USER_INFO, getUserInfo)]);
