import { ResumeAction, ResultsState, ResultsTypeKeys } from "./types";

const INITIAL_STATE: ResultsState = {
  results: {
    statistics: [],
    analysis: {
      adequate_protection: [''],
      minor_protection: [''],
      expert_analysis: '',
      improvement_opportunity: [''],
      how_to: [''],
    }
  },
  isLoading: false,
  error: {
    status: false,
    message: ''
  }
};

export default function Reducer(
  state: ResultsState = INITIAL_STATE,
  action: ResumeAction
): ResultsState {
  switch (action.type) {
    case ResultsTypeKeys.GET_RESULTS_REQUEST:
      return { ...state, isLoading: true };

    case ResultsTypeKeys.GET_RESULTS_SUCCESS:
      return { ...state, results: action.payload, isLoading: false };

    case ResultsTypeKeys.GET_RESULTS_FAILURE:
      return { ...state, isLoading: true, error: action.payload };

    default:
      return state;
  }
}
