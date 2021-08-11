import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { ResultsTypeKeys } from "./types";

function* getResults({ payload = 'user' }: ActionType<typeof actions.getResultsRequest>) {
  try {
    const { data } = yield call(api, `/results/${payload === 'user' ? 'me' : 'team'}`);
    const { results: statistics, adequate_protection, minor_protection, how_to, improvement_opportunity, expert_analysis } = data
    yield put(actions.getResultsSuccess({ statistics, analysis: { minor_protection, adequate_protection, how_to, improvement_opportunity, expert_analysis } }));
  } catch (error) {
    yield put(actions.getResultsFailure({ status: true, message: 'Ocorreu um erro' }))
  }
}


export default all([takeLatest(ResultsTypeKeys.GET_RESULTS_REQUEST, getResults)]);
