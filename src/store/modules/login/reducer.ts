import { getSavedState } from "../../../utils/localStorage";
import { LoginAction, LoginState, LoginTypeKeys } from "./types";

const INITIAL_STATE: LoginState = {
  currentUser: {
    name: '',
    email: '',
    role: '',
    _id: '',
    company: ''
  },
  isLoading: false,
  isLoggedIn: !!getSavedState('auth.token') && !!getSavedState('auth.role'),
  error: {
    status: false,
    message: ''
  },
  firstAccessFeedback: ''
};

export default function Reducer(
  state: LoginState = INITIAL_STATE,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case LoginTypeKeys.LOGIN_REQUEST:
      return {
        ...state, isLoading: true, error: {
          status: false,
          message: ''
        }
      };

    case LoginTypeKeys.LOGIN_SUCCESS:
      return { ...state, currentUser: action.payload, isLoading: false, isLoggedIn: true };

    case LoginTypeKeys.LOGIN_FAILURE:
      return { ...state, error: action.payload, isLoading: false };

    case LoginTypeKeys.LOGOUT:
      return { ...state, currentUser: { name: '', email: '', role: '', _id: '', company: '' }, isLoggedIn: false }

    case LoginTypeKeys.FIRST_ACCESS_REQUEST:
      return { ...state, isLoggedIn: true }

    case LoginTypeKeys.FIRST_ACCESS_SUCCESS:
      return { ...state, isLoggedIn: false, firstAccessFeedback: 'success' }

    case LoginTypeKeys.FIRST_ACCESS_FAILURE:
      return { ...state, isLoggedIn: false, firstAccessFeedback: 'error' }

    default:
      return state;
  }
}
