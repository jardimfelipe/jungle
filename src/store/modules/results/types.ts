import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";

export enum ResultsTypeKeys {
  GET_RESULTS_REQUEST = "@companies/GET_RESULTS_REQUEST",
  GET_RESULTS_SUCCESS = "@companies/GET_RESULTS_SUCCESS",
  GET_RESULTS_FAILURE = "@companies/GET_RESULTS_FAILURE",
}

export type ResumeProps = {
  analise: string;
  total: number;
}

export type ResumeAction = ActionType<typeof actions>;

export type ResultType = {
  dimension: string
  questionnaire: string
  result: number
  user: string
  __v: number
  _id: string
}

export type ResultsState = {
  results: ResultType[]
  isLoading: boolean;
  error: RequestError;
}

