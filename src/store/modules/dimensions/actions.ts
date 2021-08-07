import { action } from "typesafe-actions";
import { DimensionsTypeKeys, DimensionItem } from "./types";

export function getDimensionsRequest() {
  return action(DimensionsTypeKeys.GET_DIMENSIONS_REQUEST);
}

export function getDimensionsSuccess(params: DimensionItem[]) {
  return action(DimensionsTypeKeys.GET_DIMENSIONS_SUCCESS, params);
}

export function createDimensionsRequest(params: DimensionItem) {
  return action(DimensionsTypeKeys.CREATE_DIMENSIONS_SUCCESS, params);

}