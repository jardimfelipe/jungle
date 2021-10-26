import { takeLatest, all, call, put, take } from "redux-saga/effects";
import * as Effects from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { createUploadFileChannel } from "./channels/createFileUploadChannel";
import { User, UsersTypeKeys } from "./types";
import { getCompanyRequest } from "../companies/actions";

const hackyCall: any = Effects.call;

function* getUsers({ payload }: ActionType<typeof actions.getUsersRequest>) {
  try {
    const headers = payload?.headers || {}
    const { data } = yield call(api, "/users", { headers });
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

function* createUsers({ payload }: ActionType<typeof actions.createUsersRequest>): any {
  const channel = yield hackyCall(createUploadFileChannel, "/importings/upload", payload);
  while (true) {
    const { progress = 0, err, success } = yield take(channel);
    if (err) {
      yield put(actions.createUsersFailure(err));
      return;
    }
    if (success) {
      yield put(actions.createUsersSuccess());
      return;
    }
    yield put(actions.createUsersProgress(progress));
  }
}

function* deleteUsers({ payload }: ActionType<typeof actions.deleteUsersRequest>) {
  try {
    const { user, company } = payload
    yield call(api, `/users/${user._id}`, { method: "PUT", data: { ...user, active: false } });
    yield put(actions.deleteUsersSuccess());
    if (company) {
      yield put(getCompanyRequest({ headers: { company } }))
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.deleteUsersFailure('Ocorreu um erro, tente novamente mais tarde'));
      console.log(error)
    }

  }
}


export default all([takeLatest(UsersTypeKeys.GET_USERS_REQUEST, getUsers), takeLatest(UsersTypeKeys.GET_GESTORES_REQUEST, getGestores), takeLatest(UsersTypeKeys.CREATE_USERS_REQUEST, createUsers), takeLatest(UsersTypeKeys.DELETE_USERS_REQUEST, deleteUsers)]);
