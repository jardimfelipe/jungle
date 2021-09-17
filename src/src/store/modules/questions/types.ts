import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestFeedback } from "../exportTypes";
import { DimensionItem } from "../dimensions/types";

export enum QuestionsTypeKeys {
  GET_QUESTIONS_REQUEST = "@questions/GET_QUESTIONS_REQUEST",
  GET_QUESTIONS_SUCCESS = "@questions/GET_QUESTIONS_SUCCESS",

  CREATE_QUESTIONS_REQUEST = "@questions/CREATE_QUESTIONS_REQUEST",
  CREATE_QUESTIONS_SUCCESS = "@questions/CREATE_QUESTIONS_SUCCESS",
  CREATE_QUESTIONS_FAILURE = "@questions/CREATE_QUESTIONS_FAILURE",

  RESET_FEEDBACK = "@questions/RESET_FEEDBACK",
}

export type QuestionsAction = ActionType<typeof actions>;
export type Priorities = 'P1' | 'P2' | 'P3'

export type Option = {
  _id: string;
  label: string;
  value: string
}

export interface OptionModel extends Omit<Option, '_id'> { }


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
  feedback: RequestFeedback
}

export type QuestionModel = {
  title: string;
  dimension: string;
  priority: Priorities;
  weight: number;
  type: string;
  options: OptionModel[]
}

