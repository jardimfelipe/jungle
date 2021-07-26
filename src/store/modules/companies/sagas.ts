import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { CompaniesTypeKeys } from "./types";

function* getCompanies({ payload }: ActionType<typeof actions.getCompanyRequest>) {
  try {
    const { data: { items } } = yield call(api, "https://run.mocky.io/v3/3240db88-50d9-49d1-9fbe-e42edb233516", { params: { ...payload } });
    yield put(actions.getCompaniesSuccess(items));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

function* getCompany({ payload }: ActionType<typeof actions.getCompanyRequest>) {
  try {
    const { data } = yield call(api, "https://run.mocky.io/v3/6e2b4226-583e-4559-ac1f-e703dbeebd7e", { params: { ...payload } });
    yield put(actions.getCompanySuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

export default all([takeLatest(CompaniesTypeKeys.GET_COMPANIES_REQUEST, getCompanies), takeLatest(CompaniesTypeKeys.GET_COMPANY_REQUEST, getCompany)]);
