import { DimensionsAction, DimensionsState, DimensionsTypeKeys } from "./types";

const INITIAL_STATE: DimensionsState = {
  dimensions: [],
  isLoading: false,
  error: {
    status: false,
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
    default:
      return state;
  }
}
