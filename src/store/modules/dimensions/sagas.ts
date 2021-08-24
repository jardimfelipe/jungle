import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { DimensionsTypeKeys } from "./types";

function* getDimensions() {
  try {
    const { data } = yield call(api, "/dimensions");
    yield put(actions.getDimensionsSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

function* createDimension({ payload }: ActionType<typeof actions.createDimensionsRequest>) {
  try {
    yield call(api, `/dimensions`, { method: "POST", data: { ...payload, active: true } });
    yield put(actions.createDimensionsSuccess());
    yield put(actions.getDimensionsRequest());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.createDimensionFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

function* deleteDimension({ payload }: ActionType<typeof actions.deleteDimensionsRequest>) {
  try {
    yield call(api, `/dimensions/${payload}`, { method: "DELETE" });
    yield put(actions.deleteDimensionsSuccess());
    yield put(actions.getDimensionsRequest());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.deleteDimensionFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

export default all([takeLatest(DimensionsTypeKeys.GET_DIMENSIONS_REQUEST, getDimensions),
takeLatest(DimensionsTypeKeys.CREATE_DIMENSIONS_REQUEST, createDimension),
takeLatest(DimensionsTypeKeys.DELETE_DIMENSIONS_REQUEST, deleteDimension)]);
