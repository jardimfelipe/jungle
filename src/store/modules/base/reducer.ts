import { getSavedState } from "../../../utils/localStorage";
import { BaseAction, BaseState, BaseKeys } from "./types";

const INITIAL_STATE: BaseState = {
  isSidebarOpen: window.innerWidth > 768,
  isUserbarOpen: false,
  snackbar: {
    snackbarMessage: '',
    snackbarState: false
  },
  currentLanguage: getSavedState('user.currentLanguage') || "ptBR"
};

export default function Reducer(
  state: BaseState = INITIAL_STATE,
  action: BaseAction
): BaseState {
  switch (action.type) {
    case BaseKeys.SET_SIDEBAR_STATE:
      return { ...state, isSidebarOpen: action.payload };

    case BaseKeys.SET_USERBAR_STATE:
      return { ...state, isUserbarOpen: action.payload };

    case BaseKeys.SET_SNACKBAR_OPEN: {
      return {
        ...state,
        snackbar: {
          snackbarState: true,
          snackbarMessage: action.payload
        }
      };
    }

    case BaseKeys.SET_SNACKBAR_CLOSE: {
      return {
        ...state,
        snackbar: {
          snackbarState: false,
          snackbarMessage: ''
        }
      };
    }

    case BaseKeys.SET_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload
      };
    }

    default:
      return state;
  }
}
