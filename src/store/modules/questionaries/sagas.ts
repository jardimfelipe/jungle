import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import { getResultsRequest } from "../results/actions";
import * as actions from "./actions";
import { QuestionariesTypeKeys } from "./types";

function* getQuestionaries({ payload }: ActionType<typeof actions.getQuestionariesRequest>) {
  try {
    const headers = payload?.headers || { }
    const userRole = payload?.userRole || 'admin_jungle'
    const { data } = yield call(api, `/questionnaires/${userRole === 'user' ? 'current' : ''}`, { headers });
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
    yield put(getResultsRequest())
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.sendQuestionaryFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}

function* deleteQuestionary({ payload }: ActionType<typeof actions.deleteQuestionaryRequest>) {
  try {
    yield call(api, `/questionnaires/${payload}`, { method: 'DELETE' });
    yield put(actions.deleteQuestionarySuccess());
    yield put(actions.getQuestionariesRequest())
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.deleteQuestionaryFailure({ message: 'Ocorreu um erro, tente novamente', status: true }))
    }

  }
}




export default all([takeLatest(QuestionariesTypeKeys.GET_QUESTIONARIES_REQUEST, getQuestionaries),
takeLatest(QuestionariesTypeKeys.GET_QUESTIONARY_REQUEST, getQuestionary),
takeLatest(QuestionariesTypeKeys.CREATE_QUESTIONARY_REQUEST, createQuestionary),
takeLatest(QuestionariesTypeKeys.DELETE_QUESTIONARY_REQUEST, deleteQuestionary),
takeLatest(QuestionariesTypeKeys.SEND_QUESTIONARY_REQUEST, sendQuestionary)]);
