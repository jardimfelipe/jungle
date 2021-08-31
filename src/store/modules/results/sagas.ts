import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { ResultsTypeKeys } from "./types";
import * as Effects from "redux-saga/effects";

import { getSavedState } from "../../../utils/localStorage";
import { translateText } from "../../../utils/translateApiConfig";

const hackyCall: any = Effects.call;

function* getResults({ payload = 'user' }: ActionType<typeof actions.getResultsRequest>) {
  try {
    const { data } = yield call(api, `/results/${payload === 'user' ? 'me' : 'team'}`);
    const currentLanguage = getSavedState('user.currentLanguage')
    if (currentLanguage !== "ptBR") {
      const { results: statistics, adequate_protection, ...rest } = data
      const translatedProtection: ReturnType<typeof translateText> = yield hackyCall(translateText(data.adequate_protection, currentLanguage.replace(/[^a-z]/g, '')))
      yield put(actions.getResultsSuccess({ statistics, analysis: { ...rest, adequate_protection: translatedProtection } }));
    } else {
      const { results: statistics, ...rest } = data
      yield put(actions.getResultsSuccess({ statistics, analysis: { ...rest } }));
    }
  } catch (error) {
    yield put(actions.getResultsFailure({ status: true, message: 'Ocorreu um erro' }))
  }
}


export default all([takeLatest(ResultsTypeKeys.GET_RESULTS_REQUEST, getResults)]);
