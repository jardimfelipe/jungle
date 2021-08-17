import { action } from "typesafe-actions";
import { RequestParams } from "../exportTypes";
import { Questionary } from "../questionaries/types";
import { CompaniesTypeKeys, CompanyItem, CompanyModel, RequestParamsCompany } from "./types";

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

export function insertQuestionaryRequest(params: Questionary) {
  return action(CompaniesTypeKeys.INSERT_QUESTIONARY_REQUEST, params);
}

export function insertQuestionarySuccess() {
  return action(CompaniesTypeKeys.INSERT_QUESTIONARY_SUCCESS);
}