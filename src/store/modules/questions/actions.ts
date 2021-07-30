import { action } from "typesafe-actions";
import { QuestionsTypeKeys, QuestionItem } from "./types";

export function getQuestionsRequest() {
  return action(QuestionsTypeKeys.GET_QUESTIONS_REQUEST);
}

export function getQuestionsSuccess(params: QuestionItem[]) {
  return action(QuestionsTypeKeys.GET_QUESTIONS_SUCCESS, params);
}