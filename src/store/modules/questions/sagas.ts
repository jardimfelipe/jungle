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
    yield put(actions.getQuestionsRequest());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.createQuestionFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }
  }
}

function* editQuestion({ payload }: ActionType<typeof actions.editQuestionRequest>) {
  try {
    yield call(api, `/questions/${payload.id}`, { method: "PUT", data: payload.model });
    yield put(actions.createQuestionSuccess());
    yield put(actions.getQuestionsRequest());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.editQuestionFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }
  }
}

function* deleteQuestion({ payload }: ActionType<typeof actions.deleteQuestionRequest>) {
  try {
    yield call(api, `/questions/${payload}`, { method: "DELETE" });
    yield put(actions.createQuestionSuccess());
    yield put(actions.getQuestionsRequest());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.deleteQuestionFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

export default all([takeLatest(QuestionsTypeKeys.GET_QUESTIONS_REQUEST, getQuestions), takeLatest(QuestionsTypeKeys.CREATE_QUESTIONS_REQUEST, createQuestion), takeLatest(QuestionsTypeKeys.DELETE_QUESTION_REQUEST, deleteQuestion), takeLatest(QuestionsTypeKeys.EDIT_QUESTION_REQUEST, editQuestion)]);
