import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError, RequestFeedback, RequestParams } from "../exportTypes";
import { Questionary } from "../questionaries/types";

export enum CompaniesTypeKeys {
  GET_COMPANIES_REQUEST = "@companies/GET_COMPANIES_REQUEST",
  GET_COMPANIES_SUCCESS = "@companies/GET_COMPANIES_SUCCESS",
  GET_COMPANY_REQUEST = "@companies/GET_COMPANY_REQUEST",
  GET_COMPANY_SUCCESS = "@companies/GET_COMPANY_SUCCESS",

  INSERT_QUESTIONARY_REQUEST = "@companies/INSERT_QUESTIONARY_REQUEST",
  INSERT_QUESTIONARY_SUCCESS = "@companies/INSERT_QUESTIONARY_SUCCESS",

  RESET_FEEDBACK = "@companies/RESET_FEEDBACK",
}

export type CompaniesAction = ActionType<typeof actions>;

export type CompanyItem = {
  name: string,
  image: string,
  collaborators: string,
  questionnaires: string,
  active: boolean,
  id: string,
  completed: number
  createdAt: Date
}

export type Worker = {
  worker: string
  sector: string
  job: string
  admission: string
  answeredQuestionaries: string
  id: number
}

export type CompanyModel = {
  questionaries: Questionary[];
  workers: Worker[];
}

export type CompaniesState = {
  companies: CompanyItem[];
  company: CompanyModel;
  isLoading: boolean;
  error: RequestError;
  questionaryFeedback: RequestFeedback
}

export interface RequestParamsCompany extends RequestParams {
  headers?: any
}

export type TrackModel = {
  company: string,
  questionnaire: string,
  start: string,
  end: string
}