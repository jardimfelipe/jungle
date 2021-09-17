import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { ResultsTypeKeys, Statistics } from "./types";

import { getSavedState } from "../../../utils/localStorage";
import { translateText } from "../../../utils/translateApiConfig";

function* getTranslatedStatistics(statistics: Statistics[]) {
  const currentLanguage = getSavedState('user.currentLanguage')
  const descriptions = statistics.map(s => s.description)
  const titles = statistics.map(s => s.title)
  const names = statistics.map(s => s.name)
  const [...translatedDescriptions] = yield all(descriptions.map(d => call(translateText, d, currentLanguage.replace(/[^a-z]/g, ''))))
  const [...translatedNames] = yield all(names.map(d => call(translateText, d, currentLanguage.replace(/[^a-z]/g, ''))))
  const [...translatedTitles] = yield all(titles.map(d => call(translateText, d, currentLanguage.replace(/[^a-z]/g, ''))))
  const translatedStatistics = statistics.map((s, index) => ({
    ...s,
    description: translatedDescriptions[index],
    name: translatedNames[index],
    title: translatedTitles[index]
  }))
  return translatedStatistics
}


function* getResults({ payload = 'user' }: ActionType<typeof actions.getResultsRequest>) {
  try {
    const { data } = yield call(api, `/results/${payload === 'user' ? 'me' : 'team'}`);
    const currentLanguage = getSavedState('user.currentLanguage')
    const { results: statistics, adequate_protection, minor_protection, ...rest } = data
    if (currentLanguage && currentLanguage !== "ptBR") {
      const [translate_adequate_protection, translate_minor_protection]: ReturnType<typeof translateText>[] = yield all([
        call(translateText, adequate_protection, currentLanguage.replace(/[^a-z]/g, '')),
        call(translateText, minor_protection, currentLanguage.replace(/[^a-z]/g, '')),
      ])
      const translatedStatistics: ReturnType<typeof getTranslatedStatistics> = yield call(getTranslatedStatistics, statistics)
      yield put(actions.getResultsSuccess({ statistics: translatedStatistics as unknown as Statistics[], analysis: { adequate_protection: translate_adequate_protection as unknown as string[], minor_protection: translate_minor_protection as unknown as string[], ...rest } }));
    } else {
      console.log('pter')
      yield put(actions.getResultsSuccess({ statistics, analysis: { adequate_protection, minor_protection, ...rest } }));
    }
  } catch (error) {
    yield put(actions.getResultsFailure({ status: true, message: 'Ocorreu um erro' }))
  }
}


export default all([takeLatest(ResultsTypeKeys.GET_RESULTS_REQUEST, getResults)]);
