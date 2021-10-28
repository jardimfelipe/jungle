import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestFeedback } from "../exportTypes";
 
export enum DimensionsTypeKeys {
  GET_DIMENSIONS_REQUEST = "@dimensions/GET_DIMENSIONS_REQUEST",
  GET_DIMENSIONS_SUCCESS = "@dimensions/GET_DIMENSIONS_SUCCESS",

  CREATE_DIMENSIONS_REQUEST = "@dimensions/CREATE_DIMENSIONS_REQUEST",
  CREATE_DIMENSIONS_SUCCESS = "@dimensions/CREATE_DIMENSIONS_SUCCESS",
  CREATE_DIMENSIONS_FAILURE = "@dimensions/CREATE_DIMENSIONS_FAILURE",

  DELETE_DIMENSIONS_REQUEST = "@dimensions/DELETE_DIMENSIONS_REQUEST",
  DELETE_DIMENSIONS_SUCCESS = "@dimensions/DELETE_DIMENSIONS_SUCCESS",
  DELETE_DIMENSIONS_FAILURE = "@dimensions/DELETE_DIMENSIONS_FAILURE",

  RESET_FEEDBACK = "@dimensions/RESET_FEEDBACK",
}  

export type DimensionsAction = ActionType<typeof actions>;

export type DimensionItem = {
  dimension: string;
  _id: string;
  name: string;
  qt_minimum: string;
  qt_maximum: string;
  complementary: number
  mandatory: number
  optional: number
}

export type DimensionFormModel = {
  name: string;
  qt_minimum: number;
  qt_maximum: number;
  complementary: number
  mandatory: number
  optional: number
}

export type DimensionsState = {
  dimensions: DimensionItem[];
  isLoading: boolean;
  feedback: RequestFeedback
}
