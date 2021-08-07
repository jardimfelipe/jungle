import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
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

function* createQuestion({ payload }: ActionType<typeof actions.createQuestionRequest>) {
  try {
    yield call(api, `/questions`, { method: "POST", data: payload });
    yield put(actions.createQuestionSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.createQuestionFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

export default all([takeLatest(QuestionsTypeKeys.GET_QUESTIONS_REQUEST, getQuestions), takeLatest(QuestionsTypeKeys.CREATE_QUESTIONS_REQUEST, createQuestion)]);
