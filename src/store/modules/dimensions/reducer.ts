import { DimensionsAction, DimensionsState, DimensionsTypeKeys } from "./types";

const INITIAL_STATE: DimensionsState = {
  dimensions: [],
  isLoading: false,
  feedback: {
    status: '',
    message: ''
  }
};

export default function Reducer(
  state: DimensionsState = INITIAL_STATE,
  action: DimensionsAction
): DimensionsState {
  switch (action.type) {
    case DimensionsTypeKeys.GET_DIMENSIONS_REQUEST:
      return { ...state, isLoading: true };

    case DimensionsTypeKeys.GET_DIMENSIONS_SUCCESS:
      return { ...state, dimensions: action.payload, isLoading: false };

    case DimensionsTypeKeys.CREATE_DIMENSIONS_REQUEST:
      return { ...state, isLoading: true };

    case DimensionsTypeKeys.CREATE_DIMENSIONS_SUCCESS:
      return { ...state, feedback: { status: 'success', message: 'Dimensão cadastrada com sucesso!' }, isLoading: false }

    case DimensionsTypeKeys.CREATE_DIMENSIONS_FAILURE:
      return { ...state, isLoading: false };

    case DimensionsTypeKeys.RESET_FEEDBACK:
      return {
        ...state, feedback: {
          status: '',
          message: ''
        }
      }
    default:
      return state;
  }
}
