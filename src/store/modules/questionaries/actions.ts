import { action } from "typesafe-actions";
import { RequestError, UserRoles } from "../exportTypes";
import { QuestionariesTypeKeys, Questionary, QuestionaryAnswers, QuestionaryModel } from "./types";

export function getQuestionariesRequest(params: UserRoles = 'admin_jungle') {
  return action(QuestionariesTypeKeys.GET_QUESTIONARIES_REQUEST, params);
}

export function getQuestionariesSuccess(params: Questionary[]) {
  return action(QuestionariesTypeKeys.GET_QUESTIONARIES_SUCCESS, params);
}

export function getQuestionariesFailure(error: RequestError) {
  return action(QuestionariesTypeKeys.GET_QUESTIONARIES_FAILURE, error);
}

export function getQuestionaryRequest(id: string) {
  return action(QuestionariesTypeKeys.GET_QUESTIONARY_REQUEST, id);
}

export function getQuestionarySuccess(params: Questionary) {
  return action(QuestionariesTypeKeys.GET_QUESTIONARY_SUCCESS, params);
}

export function getQuestionaryFailure(error: RequestError) {
  return action(QuestionariesTypeKeys.GET_QUESTIONARY_FAILURE, error);
}

export function createQuestionaryRequest(params: QuestionaryModel) {
  return action(QuestionariesTypeKeys.CREATE_QUESTIONARY_REQUEST, params);
}
export function createQuestionarySuccess() {
  return action(QuestionariesTypeKeys.CREATE_QUESTIONARY_SUCCESS);
}

export function createQuestionaryFailure(error: RequestError) {
  return action(QuestionariesTypeKeys.CREATE_QUESTIONARY_FAILURE, error);
}

export function deleteQuestionaryRequest(params: string) {
  return action(QuestionariesTypeKeys.DELETE_QUESTIONARY_REQUEST, params);
}
export function deleteQuestionarySuccess() {
  return action(QuestionariesTypeKeys.DELETE_QUESTIONARY_SUCCESS);
}

export function deleteQuestionaryFailure(error: RequestError) {
  return action(QuestionariesTypeKeys.DELETE_QUESTIONARY_FAILURE, error);
}

export function resetFeeback() {
  return action(QuestionariesTypeKeys.RESET_FEEDBACK);
}

export function sendQuestionaryRequest(params: QuestionaryAnswers) {
  return action(QuestionariesTypeKeys.SEND_QUESTIONARY_REQUEST, params);
}
export function sendQuestionarySuccess() {
  return action(QuestionariesTypeKeys.SEND_QUESTIONARY_SUCCESS);
}

export function sendQuestionaryFailure(error: RequestError) {
  return action(QuestionariesTypeKeys.SEND_QUESTIONARY_FAILURE, error);
}
