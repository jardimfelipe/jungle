import { takeLatest, all, call, put } from "redux-saga/effects";
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

export default all([takeLatest(DimensionsTypeKeys.GET_DIMENSIONS_REQUEST, getDimensions)]);
