import { action } from "typesafe-actions";
import { RequestParams } from "../exportTypes";
import { CompaniesTypeKeys, CompanyItem, CompanyModel, RemoveTrackingParams, RequestParamsCompany, TrackModel } from "./types";


export function getCompaniesRequest(params?: RequestParams) {
  return action(CompaniesTypeKeys.GET_COMPANIES_REQUEST, params);
}

export function getCompaniesSuccess(params: CompanyItem[]) {
  return action(CompaniesTypeKeys.GET_COMPANIES_SUCCESS, params);
}

export function getCompanyRequest(params: RequestParamsCompany) {
  return action(CompaniesTypeKeys.GET_COMPANY_REQUEST, params);
}

export function getCompanySuccess(params: CompanyModel) {
  return action(CompaniesTypeKeys.GET_COMPANY_SUCCESS, params);
}

export function insertQuestionaryRequest(params: TrackModel) {
  return action(CompaniesTypeKeys.INSERT_QUESTIONARY_REQUEST, params);
}

export function insertQuestionarySuccess() {
  return action(CompaniesTypeKeys.INSERT_QUESTIONARY_SUCCESS);
}

export function removeTrackingRequest(trackingId: RemoveTrackingParams) {
  return action(CompaniesTypeKeys.REMOVE_TRACKING_REQUEST, trackingId);
}

export function removeTrackingSuccess() {
  return action(CompaniesTypeKeys.REMOVE_TRACKING_SUCCESS);
}

export function removeTrackingFailure() {
  return action(CompaniesTypeKeys.REMOVE_TRACKING_FAILURE);
}

export function resetFeeback() {
  return action(CompaniesTypeKeys.RESET_FEEDBACK);
}