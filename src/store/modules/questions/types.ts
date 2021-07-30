import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";
import { DimensionItem } from "../dimensions/types";

export enum QuestionsTypeKeys {
  GET_QUESTIONS_REQUEST = "@questions/GET_QUESTIONS_REQUEST",
  GET_QUESTIONS_SUCCESS = "@questions/GET_QUESTIONS_SUCCESS",
}

export type QuestionsAction = ActionType<typeof actions>;
export type Priorities = 'P1' | 'P2' | 'P3'

export type Option = {
  _id: string;
  label: string;
  value: string
}

export type QuestionItem = {
  active: boolean;
  _id: string;
  title: string;
  dimension: DimensionItem;
  priority: Priorities;
  weight: number;
  type: string;
  options: Option[]
}

export type QuestionsState = {
  questions: QuestionItem[];
  isLoading: boolean;
  error: RequestError;
}

