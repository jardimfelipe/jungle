import { QuestionsAction, QuestionsState, QuestionsTypeKeys } from "./types";

const INITIAL_STATE: QuestionsState = {
  questions: [],
  isLoading: false,
  error: {
    status: false,
    message: ''
  }
};

export default function Reducer(
  state: QuestionsState = INITIAL_STATE,
  action: QuestionsAction
): QuestionsState {
  switch (action.type) {
    case QuestionsTypeKeys.GET_QUESTIONS_REQUEST:
      return { ...state, isLoading: true };

    case QuestionsTypeKeys.GET_QUESTIONS_SUCCESS:
      return { ...state, questions: action.payload, isLoading: false };
    default:
      return state;
  }
}
