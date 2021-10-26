import { UsersAction, UsersState, UsersTypeKeys } from "./types";

const INITIAL_STATE: UsersState = {
  users: [],
  gestores: [],
  admins: [],
  isLoading: false,
  isFileLoading: false,
  userFileProgress: 0,
  error: {
    status: false,
    message: ''
  },
  fileSuccess: false
};  
 
export default function Reducer(
  state: UsersState = INITIAL_STATE,
  action: UsersAction
): UsersState {
  switch (action.type) {
    case UsersTypeKeys.GET_USERS_REQUEST:
      return { ...state, isLoading: true };

    case UsersTypeKeys.GET_USERS_SUCCESS:
      return { ...state, users: action.payload, isLoading: false };

    case UsersTypeKeys.GET_GESTORES_REQUEST:
      return { ...state, isLoading: true };

    case UsersTypeKeys.GET_GESTORES_SUCCESS:
      return { ...state, gestores: action.payload, isLoading: false };

    case UsersTypeKeys.CREATE_USERS_REQUEST:
      return { ...state, isFileLoading: true, error: { status: false, message: '' } };

    case UsersTypeKeys.CREATE_USERS_SUCCESS:
      return { ...state, isFileLoading: false, userFileProgress: 0, fileSuccess: true };

    case UsersTypeKeys.CREATE_USERS_FAILURE:
      return { ...state, isFileLoading: false, error: { status: true, message: action.payload }, userFileProgress: 0 };

    case UsersTypeKeys.CREATE_USERS_PROGRESS:
      return { ...state, userFileProgress: action.payload };

    case UsersTypeKeys.RESET_USERS_ERRORS:
      return { ...state, error: { ...INITIAL_STATE.error }, userFileProgress: 0, fileSuccess: false };

    case UsersTypeKeys.DELETE_USERS_REQUEST:
      return { ...state, isLoading: true };

    case UsersTypeKeys.DELETE_USERS_SUCCESS:
      return { ...state, isLoading: false, userFileProgress: 0, fileSuccess: true };

    case UsersTypeKeys.DELETE_USERS_FAILURE:
      return { ...state, isLoading: false, error: { status: true, message: action.payload } };
    default:
      return state;
  }
}

