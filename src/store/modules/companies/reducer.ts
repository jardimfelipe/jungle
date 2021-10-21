import { CompaniesAction, CompaniesState, CompaniesTypeKeys } from "./types";

const INITIAL_STATE: CompaniesState = {
  companies: [],
  company: { questionaries: [], workers: [] },
  isLoading: false,
  error: {
    status: false,
    message: ''
  },
  questionaryFeedback: {
    status: '',
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

    case CompaniesTypeKeys.INSERT_QUESTIONARY_REQUEST:
      return { ...state, isLoading: true };

    case CompaniesTypeKeys.INSERT_QUESTIONARY_SUCCESS:
      return {
        ...state, isLoading: false, questionaryFeedback: {
          status: 'success',
          message: 'Questionário adicionado com sucesso!'
        }
      };

    case CompaniesTypeKeys.REMOVE_TRACKING_REQUEST:
      return { ...state, isLoading: true };

    case CompaniesTypeKeys.REMOVE_TRACKING_FAILURE:
      return { ...state, isLoading: false };

    case CompaniesTypeKeys.REMOVE_TRACKING_SUCCESS:
      return { ...state, isLoading: false };

    case CompaniesTypeKeys.RESET_FEEDBACK:
      return {
        ...state, isLoading: false, questionaryFeedback: { ...INITIAL_STATE.questionaryFeedback }
      };
    default:
      return state;
  }
}
