import { takeLatest, all, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from "./actions";
import { CompaniesTypeKeys } from "./types";


function* getCompanies({ payload }: ActionType<typeof actions.getCompanyRequest>) {
  try {
    const { data } = yield call(api, "/companies", { params: { ...payload } });
    yield put(actions.getCompaniesSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

function* getCompany({ payload }: ActionType<typeof actions.getCompanyRequest>) {
  try {
    const { headers } = payload
    const [{ data: questionaries }, { data: workers }] = yield all([
      call(api.get, "/questionnaires/current", { headers }),
      call(api.get, "users", { headers }),
    ]);
    yield put(actions.getCompanySuccess({ questionaries, workers }));
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

function* insertQuestionary({ payload }: ActionType<typeof actions.insertQuestionaryRequest>) {
  try {
    yield call(api, "/questionnaires/tracking", { method: "POST", data: payload });
    yield put(actions.insertQuestionarySuccess());
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
    }

  }
}

function* removeTracking({ payload }: ActionType<typeof actions.removeTrackingRequest>) {
  try {
    const { trackingId, companyId } = payload
    yield call(api, `/questionnaires/tracking/${trackingId}`, { method: "DELETE" });
    const [{ data: questionaries }, { data: workers }] = yield all([
      call(api.get, "/questionnaires/current", { headers: { company: companyId } }),
      call(api.get, "users", { headers: { company: companyId } }),
    ]);
    yield put(actions.getCompanySuccess({ questionaries, workers }));
    yield put(actions.removeTrackingSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.removeTrackingFailure());
    }
  }
}

export default all([takeLatest(CompaniesTypeKeys.GET_COMPANIES_REQUEST, getCompanies), takeLatest(CompaniesTypeKeys.GET_COMPANY_REQUEST, getCompany), takeLatest(CompaniesTypeKeys.INSERT_QUESTIONARY_REQUEST, insertQuestionary), takeLatest(CompaniesTypeKeys.REMOVE_TRACKING_REQUEST, removeTracking)]);
