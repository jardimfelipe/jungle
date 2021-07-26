import { action } from "typesafe-actions";
import { DimensionsTypeKeys, DimensionItem } from "./types";

export function getDimensionsRequest() {
  return action(DimensionsTypeKeys.GET_DIMENSIONS_REQUEST);
}

export function getDimensionsSuccess(params: DimensionItem[]) {
  return action(DimensionsTypeKeys.GET_DIMENSIONS_SUCCESS, params);
}