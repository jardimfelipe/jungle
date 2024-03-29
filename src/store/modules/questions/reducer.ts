import { QuestionsAction, QuestionsState, QuestionsTypeKeys } from "./types";

const INITIAL_STATE: QuestionsState = {
  questions: [],
  isLoading: false,
  feedback: {
    status: '',
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

    case QuestionsTypeKeys.DELETE_QUESTION_REQUEST:
      return { ...state, isLoading: true };

    case QuestionsTypeKeys.DELETE_QUESTION_SUCCESS:
      return { ...state, isLoading: false };

    case QuestionsTypeKeys.DELETE_QUESTION_FAILURE:
      return { ...state, isLoading: false };

    case QuestionsTypeKeys.CREATE_QUESTIONS_REQUEST:
      return { ...state, isLoading: true };

    case QuestionsTypeKeys.CREATE_QUESTIONS_SUCCESS:
      return { ...state, feedback: { status: 'success', message: 'Pergunta cadastrada com sucesso!' }, isLoading: false }

    case QuestionsTypeKeys.CREATE_QUESTIONS_FAILURE:
      return { ...state, isLoading: false };


    case QuestionsTypeKeys.EDIT_QUESTION_REQUEST:
      return { ...state, isLoading: true };

    case QuestionsTypeKeys.EDIT_QUESTION_SUCCESS:
      return { ...state, feedback: { status: 'success', message: 'Pergunta cadastrada com sucesso!' }, isLoading: false }

    case QuestionsTypeKeys.EDIT_QUESTION_FAILURE:
      return { ...state, isLoading: false };

    case QuestionsTypeKeys.RESET_FEEDBACK:
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
