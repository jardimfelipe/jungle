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
  feedback: {
    status: '',
    message: ''
  }
};

export default function Reducer(
  state: QuestionariesState = INITIAL_STATE,
  action: QuestionariesAction
): QuestionariesState {
  switch (action.type) {

    case QuestionariesTypeKeys.GET_QUESTIONARIES_REQUEST:
      return { ...state, isLoading: true, feedback: { status: '', message: '' } }

    case QuestionariesTypeKeys.GET_QUESTIONARIES_SUCCESS:
      return { ...state, questionaries: action.payload, isLoading: false }

    case QuestionariesTypeKeys.GET_QUESTIONARIES_FAILURE:
      return { ...state, feedback: { status: 'error', message: 'Tente novamente mais tarde' }, isLoading: false }

    case QuestionariesTypeKeys.GET_QUESTIONARY_REQUEST:
      return { ...state, isLoading: true }

    case QuestionariesTypeKeys.GET_QUESTIONARY_SUCCESS:
      return { ...state, questionary: action.payload, isLoading: false }

    case QuestionariesTypeKeys.GET_QUESTIONARY_FAILURE:
      return { ...state, feedback: { status: 'error', message: 'Tente novamente mais tarde' }, isLoading: false }

    case QuestionariesTypeKeys.CREATE_QUESTIONARY_REQUEST:
      return { ...state, isLoading: true }

    case QuestionariesTypeKeys.CREATE_QUESTIONARY_SUCCESS:
      return { ...state, feedback: { status: 'success', message: 'Questionário criado com sucesso!' }, isLoading: false }

    case QuestionariesTypeKeys.CREATE_QUESTIONARY_FAILURE:
      return { ...state, feedback: { status: 'error', message: 'Tente novamente mais tarde' }, isLoading: false }

    case QuestionariesTypeKeys.RESET_FEEDBACK:
      return { ...state, feedback: { status: '', message: '' } }
    default:
      return state;
  }
}
