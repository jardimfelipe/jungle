import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { RequestError } from "../exportTypes";

export enum CompaniesTypeKeys {
  GET_COMPANIES_REQUEST = "@companies/GET_COMPANIES_REQUEST",
  GET_COMPANIES_SUCCESS = "@companies/GET_COMPANIES_SUCCESS",
  GET_COMPANY_REQUEST = "@companies/GET_COMPANY_REQUEST",
  GET_COMPANY_SUCCESS = "@companies/GET_COMPANY_SUCCESS",
}

export type CompaniesAction = ActionType<typeof actions>;

export type CompanyItem = {
  company: string,
  workers: string,
  questions: string,
  filled: number,
  active: string,
  createdAt: string,
  id: number,
}

export type Questionary = {
  title: string;
  dimension: string;
  numberOfQuestions: string;
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

