import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { QuestionariesTypeKeys } from "./types";

function* getQuestionaries() {
  try {
    const { data } = yield call(api, "/questionnaires");
    yield put(actions.getQuestionariesSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.getQuestionariesFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

function* getQuestionary({ payload }: ActionType<typeof actions.getQuestionaryRequest>) {
  try {
    const { data } = yield call(api, `/questionnaires/${payload}`);
    yield put(actions.getQuestionarySuccess(data));
    yield put(actions.getQuestionariesRequest())
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.getQuestionariesFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

function* createQuestionary({ payload }: ActionType<typeof actions.createQuestionaryRequest>) {
  try {
    yield call(api, `/questionnaires/`, { method: "POST", data: payload });
    yield put(actions.createQuestionarySuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.getQuestionariesFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

function* sendQuestionary({ payload }: ActionType<typeof actions.sendQuestionaryRequest>) {
  try {
    yield call(api, `/answers`, { method: "POST", data: payload });
    yield put(actions.sendQuestionarySuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.sendQuestionaryFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}




export default all([takeLatest(QuestionariesTypeKeys.GET_QUESTIONARIES_REQUEST, getQuestionaries),
takeLatest(QuestionariesTypeKeys.GET_QUESTIONARY_REQUEST, getQuestionary),
takeLatest(QuestionariesTypeKeys.CREATE_QUESTIONARY_REQUEST, createQuestionary),
takeLatest(QuestionariesTypeKeys.SEND_QUESTIONARY_REQUEST, sendQuestionary)]);
