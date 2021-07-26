import { QuestionariesAction, QuestionariesState, QuestionariesTypeKeys } from "./types";

const INITIAL_STATE: QuestionariesState = {
  questionaries: [],
  questionary: {
    title: '',
    _id: '',
    description: '',
    dimension: {
      name: ''
    },
    question: [],
    active: true,
    required: true,
    done: '',
  },
  isLoading: false,
  error: {
    status: false,
    message: ''
  }
};

export default function Reducer(
  state: QuestionariesState = INITIAL_STATE,
  action: QuestionariesAction
): QuestionariesState {
  switch (action.type) {

    case QuestionariesTypeKeys.GET_QUESTIONARIES_REQUEST:
      return { ...state, isLoading: true, error: { status: false, message: '' } }

    case QuestionariesTypeKeys.GET_QUESTIONARIES_SUCCESS:
      return { ...state, questionaries: action.payload, isLoading: false }

    case QuestionariesTypeKeys.GET_QUESTIONARIES_FAILURE:
      return { ...state, error: action.payload, isLoading: false }

    case QuestionariesTypeKeys.GET_QUESTIONARY_REQUEST:
      return { ...state, isLoading: true }

    case QuestionariesTypeKeys.GET_QUESTIONARY_SUCCESS:
      return { ...state, questionary: action.payload, isLoading: false }

    case QuestionariesTypeKeys.GET_QUESTIONARY_FAILURE:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state;
  }
}
