import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";

export enum DimensionsTypeKeys {
  GET_DIMENSIONS_REQUEST = "@companies/GET_DIMENSIONS_REQUEST",
  GET_DIMENSIONS_SUCCESS = "@companies/GET_DIMENSIONS_SUCCESS",
}

export type DimensionsAction = ActionType<typeof actions>;

export type DimensionItem = {
  dimension: string;
  name: string;
  min: string;
  p1: string;
  p2: string;
  p3: string;
  max: string;
  id: number
}

export type DimensionsState = {
  dimensions: DimensionItem[];
  isLoading: boolean;
  error: RequestError;
}

