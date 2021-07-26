import { CompaniesAction, CompaniesState, CompaniesTypeKeys } from "./types";

const INITIAL_STATE: CompaniesState = {
  companies: [],
  company: { questionaries: [], workers: [] },
  isLoading: false,
  error: {
    status: false,
    message: ''
  }
};

export default function Reducer(
  state: CompaniesState = INITIAL_STATE,
  action: CompaniesAction
): CompaniesState {
  switch (action.type) {
    case CompaniesTypeKeys.GET_COMPANIES_REQUEST:
      return { ...state, isLoading: true };

    case CompaniesTypeKeys.GET_COMPANIES_SUCCESS:
      return { ...state, companies: action.payload, isLoading: false };

    case CompaniesTypeKeys.GET_COMPANY_REQUEST:
      return { ...state, isLoading: true };

    case CompaniesTypeKeys.GET_COMPANY_SUCCESS:
      return { ...state, company: action.payload, isLoading: false };
    default:
      return state;
  }
}
