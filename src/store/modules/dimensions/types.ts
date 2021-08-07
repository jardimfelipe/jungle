import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";

export enum DimensionsTypeKeys {
  GET_DIMENSIONS_REQUEST = "@dimensions/GET_DIMENSIONS_REQUEST",
  GET_DIMENSIONS_SUCCESS = "@dimensions/GET_DIMENSIONS_SUCCESS",

  CREATE_DIMENSIONS_REQUEST = "@dimensions/CREATE_DIMENSIONS_REQUEST",
  CREATE_DIMENSIONS_SUCCESS = "@dimensions/CREATE_DIMENSIONS_SUCCESS",
}

export type DimensionsAction = ActionType<typeof actions>;

export type DimensionItem = {
  dimension: string;
  _id: string;
  name: string;
  qt_minimum: string;
  p1: string;
  p2: string;
  p3: string;
  qt_maximum: string;
  id: number;
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
  error: RequestError;
}

