import { action } from "typesafe-actions";
import { RequestError } from "../exportTypes";
import { ResultsTypeKeys, ResultsState } from "./types";

export function getResultsRequest() {
  return action(ResultsTypeKeys.GET_RESULTS_REQUEST);
}

export function getResultsSuccess(params: ResultsState["results"]) {
  return action(ResultsTypeKeys.GET_RESULTS_SUCCESS, params);
}

export function getResultsFailure(error: RequestError) {
  return action(ResultsTypeKeys.GET_RESULTS_FAILURE, error);
}
