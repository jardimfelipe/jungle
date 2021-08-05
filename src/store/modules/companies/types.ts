import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError, RequestParams } from "../exportTypes";
import { DimensionItem } from "../dimensions/types";
import { Question } from "../questionaries/types";

export enum CompaniesTypeKeys {
  GET_COMPANIES_REQUEST = "@companies/GET_COMPANIES_REQUEST",
  GET_COMPANIES_SUCCESS = "@companies/GET_COMPANIES_SUCCESS",
  GET_COMPANY_REQUEST = "@companies/GET_COMPANY_REQUEST",
  GET_COMPANY_SUCCESS = "@companies/GET_COMPANY_SUCCESS",
}

export type CompaniesAction = ActionType<typeof actions>;

export type CompanyItem = {
  name: string,
  image: string,
  collaborators: string,
  questionnaires: string,
  active: boolean,
  id: string,
}

export type Questionary = {
  title: string;
  dimension?: DimensionItem;
  question: Question[];
  createdAt: string;
  track: string;
  status: string;
  id: number
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
}

export interface RequestParamsCompany extends RequestParams {
  headers?: any
}