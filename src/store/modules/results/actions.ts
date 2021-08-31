import { action } from "typesafe-actions";
import { RequestError, UserRoles } from "../exportTypes";
import { ResultsTypeKeys, ResultsState } from "./types";

export function getResultsRequest(role?: UserRoles) {
  return action(ResultsTypeKeys.GET_RESULTS_REQUEST, role);
}

export function getResultsSuccess(params: ResultsState["results"]) {
  console.log(params)
  return action(ResultsTypeKeys.GET_RESULTS_SUCCESS, params);
}

export function getResultsFailure(error: RequestError) {
  return action(ResultsTypeKeys.GET_RESULTS_FAILURE, error);
}
