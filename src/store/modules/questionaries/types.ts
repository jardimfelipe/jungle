import { ActionType } from "typesafe-actions";
import { RequestFeedback } from "../exportTypes";
import { Option } from '../../../store/modules/questions/types';
import * as actions from "./actions";

export enum QuestionariesTypeKeys {
  GET_QUESTIONARIES_REQUEST = "@companies/GET_QUESTIONARIES_REQUEST",
  GET_QUESTIONARIES_FAILURE = "@companies/GET_QUESTIONARIES_FAILURE",
  GET_QUESTIONARIES_SUCCESS = "@companies/GET_QUESTIONARIES_SUCCESS",

  GET_QUESTIONARY_REQUEST = "@companies/GET_QUESTIONARY_REQUEST",
  GET_QUESTIONARY_FAILURE = "@companies/GET_QUESTIONARY_FAILURE",
  GET_QUESTIONARY_SUCCESS = "@companies/GET_QUESTIONARY_SUCCESS",

  CREATE_QUESTIONARY_REQUEST = "@companies/CREATE_QUESTIONARY_REQUEST",
  CREATE_QUESTIONARY_FAILURE = "@companies/CREATE_QUESTIONARY_FAILURE",
  CREATE_QUESTIONARY_SUCCESS = "@companies/CREATE_QUESTIONARY_SUCCESS",

  SEND_QUESTIONARY_REQUEST = "@companies/SEND_QUESTIONARY_REQUEST",
  SEND_QUESTIONARY_SUCCESS = "@companies/SEND_QUESTIONARY_SUCCESS",
  SEND_QUESTIONARY_FAILURE = "@companies/SEND_QUESTIONARY_FAILURE",

  RESET_FEEDBACK = "@companies/RESET_FEEDBACK",
}

export type QuestionariesAction = ActionType<typeof actions>;

export type Question = {
  _id: string,
  title: string,
  options: [
    {
      label: string,
      value: string,
      _id: string
    },
    {
      label: string,
      value: string,
      _id: string
    }
  ]
}

export type Questionary = {
  title: string
  _id: string
  description: string
  dimension?: {
    name: string
    _id: string
  }
  question: Question[]
  active: boolean,
  required: boolean
  done?: string;
}

export type QuestionariesState = {
  questionaries: Questionary[];
  questionary: Questionary;
  isLoading: boolean;
  feedback: RequestFeedback;
}

export type QuestionaryModel = {
  title: string,
  description: string,
  active: boolean,
  required: boolean,
  dimension: string,
  question: string[],
}

export type Answer = {
  question_id: string;
  answer: Option | undefined;
};

export type QuestionaryAnswers = {
  questionnaire: string,
  dimension: string,
  answers: Answer[]
}