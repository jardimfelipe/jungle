import { action } from "typesafe-actions";
import { RequestError } from "../exportTypes";
import { QuestionariesTypeKeys, Questionary, QuestionaryModel } from "./types";

export function getQuestionariesRequest() {
  return action(QuestionariesTypeKeys.GET_QUESTIONARIES_REQUEST);
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

export function resetFeeback() {
  return action(QuestionariesTypeKeys.RESET_FEEDBACK);
}
