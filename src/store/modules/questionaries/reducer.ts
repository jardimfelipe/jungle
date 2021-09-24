import { QuestionariesAction, QuestionariesState, QuestionariesTypeKeys } from "./types";

const INITIAL_STATE: QuestionariesState = {
  questionaries: [],
  questionary: {
    title: '',
    track: '',
    _id: '',
    description: '',
    answered: false,
    tracking_end: new Date(),
    tracking_start: new Date(),
    tracking: '',
    respondents: 0,
    replied: 0,
    dimension: {
      dimension: '',
      _id: '',
      name: '',
      qt_minimum: '',
      qt_maximum: '',
      complementary: 0,
      mandatory: 0,
      optional: 0
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

    case QuestionariesTypeKeys.SEND_QUESTIONARY_REQUEST:
      return { ...state, isLoading: true }

    case QuestionariesTypeKeys.SEND_QUESTIONARY_SUCCESS:
      return { ...state, feedback: { status: 'success', message: 'Questionário enviado com sucesso!' }, isLoading: false }

    case QuestionariesTypeKeys.SEND_QUESTIONARY_FAILURE:
      return { ...state, feedback: { status: 'error', message: 'Tente novamente mais tarde' }, isLoading: false }
    default:
      return state;
  }
}
