import { action } from "typesafe-actions";
import { RequestError } from "../exportTypes";
import { QuestionsTypeKeys, QuestionItem, QuestionModel } from "./types";

export function getQuestionsRequest() {
  return action(QuestionsTypeKeys.GET_QUESTIONS_REQUEST);
}

export function getQuestionsSuccess(params: QuestionItem[]) {
  return action(QuestionsTypeKeys.GET_QUESTIONS_SUCCESS, params);
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

export function resetQuestionFeedback() {
  return action(QuestionsTypeKeys.RESET_FEEDBACK)
}