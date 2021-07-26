import { action } from "typesafe-actions";
import { RequestParams } from "../exportTypes";
import { CompaniesTypeKeys, CompanyItem, CompanyModel } from "./types";

export function getCompaniesRequest(params: RequestParams) {
  return action(CompaniesTypeKeys.GET_COMPANIES_REQUEST, params);
}

export function getCompaniesSuccess(params: CompanyItem[]) {
  return action(CompaniesTypeKeys.GET_COMPANIES_SUCCESS, params);
}

export function getCompanyRequest(params: RequestParams) {
  return action(CompaniesTypeKeys.GET_COMPANY_REQUEST, params);
}

export function getCompanySuccess(params: CompanyModel) {
  return action(CompaniesTypeKeys.GET_COMPANY_SUCCESS, params);
}