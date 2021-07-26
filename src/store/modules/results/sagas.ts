import { takeLatest, all, call, put } from "redux-saga/effects";
import api from "../../../services/api";
import * as actions from "./actions";
import { ResultsTypeKeys } from "./types";

function* getResults() {
  try {
    const { data } = yield call(api, "https://run.mocky.io/v3/8e83ace8-ad07-426c-b39c-456e4096333f");
    yield put(actions.getResultsSuccess(data));
  } catch (error) {
    yield put(actions.getResultsFailure({ status: true, message: 'Ocorreu um erro' }))
  }
}


export default all([takeLatest(ResultsTypeKeys.GET_RESULTS_REQUEST, getResults)]);
