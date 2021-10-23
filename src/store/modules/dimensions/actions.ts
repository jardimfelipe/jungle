import { action } from "typesafe-actions";
import { RequestError } from "../exportTypes";
import { DimensionsTypeKeys, DimensionItem, DimensionFormModel } from "./types";


export function getDimensionsRequest() {
  return action(DimensionsTypeKeys.GET_DIMENSIONS_REQUEST);
}

export function getDimensionsSuccess(params: DimensionItem[]) {
  return action(DimensionsTypeKeys.GET_DIMENSIONS_SUCCESS, params);
}

export function createDimensionsRequest(params: DimensionFormModel) {
  return action(DimensionsTypeKeys.CREATE_DIMENSIONS_REQUEST, params);
}

export function createDimensionsSuccess() {
  return action(DimensionsTypeKeys.CREATE_DIMENSIONS_SUCCESS);
}

export function createDimensionFailure(params: RequestError) {
  return action(DimensionsTypeKeys.CREATE_DIMENSIONS_FAILURE, params);
}

export function deleteDimensionsRequest(params: string) {
  return action(DimensionsTypeKeys.DELETE_DIMENSIONS_REQUEST, params);
}

export function deleteDimensionsSuccess() {
  return action(DimensionsTypeKeys.DELETE_DIMENSIONS_SUCCESS);
}

export function deleteDimensionFailure(params: RequestError) {
  return action(DimensionsTypeKeys.DELETE_DIMENSIONS_FAILURE, params);
}

export function resetDimensionFeedback() {
  return action(DimensionsTypeKeys.RESET_FEEDBACK)
}
