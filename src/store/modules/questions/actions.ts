import { action } from "typesafe-actions";
import { RequestError } from "../exportTypes";
import { QuestionsTypeKeys, QuestionItem, QuestionModel, EditQuestionParams } from "./types";

export function getQuestionsRequest() {
  return action(QuestionsTypeKeys.GET_QUESTIONS_REQUEST);
}

export function getQuestionsSuccess(params: QuestionItem[]) {
  return action(QuestionsTypeKeys.GET_QUESTIONS_SUCCESS, params);
}

export function deleteQuestionRequest(id: string) {
  return action(QuestionsTypeKeys.DELETE_QUESTION_REQUEST, id);
}

export function deleteQuestionSuccess() {
  return action(QuestionsTypeKeys.DELETE_QUESTION_SUCCESS);
}

export function deleteQuestionFailure(params: RequestError) {
  return action(QuestionsTypeKeys.DELETE_QUESTION_FAILURE, params);
}

export function createQuestionRequest(params: QuestionModel) {
  return action(QuestionsTypeKeys.CREATE_QUESTIONS_REQUEST, params);
}

export function createQuestionSuccess() {
  return action(QuestionsTypeKeys.CREATE_QUESTIONS_SUCCESS);
}

export function createQuestionFailure(params: RequestError) {
  return action(QuestionsTypeKeys.CREATE_QUESTIONS_FAILURE, params);
}

export function editQuestionRequest(params: EditQuestionParams) {
  return action(QuestionsTypeKeys.EDIT_QUESTION_REQUEST, params);
}

export function editQuestionSuccess() {
  return action(QuestionsTypeKeys.EDIT_QUESTION_SUCCESS);
}

export function editQuestionFailure(params: RequestError) {
  return action(QuestionsTypeKeys.EDIT_QUESTION_FAILURE, params);
}

export function resetQuestionFeedback() {
  return action(QuestionsTypeKeys.RESET_FEEDBACK)
}