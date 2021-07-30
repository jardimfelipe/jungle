import { takeLatest, all, call, put } from "redux-saga/effects";
import api from "../../../services/api";
import * as actions from "./actions";
import { QuestionsTypeKeys } from "./types";

function* getQuestions() {
  try {
    const { data } = yield call(api, "/questions");
    yield put(actions.getQuestionsSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

export default all([takeLatest(QuestionsTypeKeys.GET_QUESTIONS_REQUEST, getQuestions)]);
