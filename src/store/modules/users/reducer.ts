import { UsersAction, UsersState, UsersTypeKeys } from "./types";

const INITIAL_STATE: UsersState = {
  users: [],
  gestores: [],
  admins: [],
  isLoading: false,
  error: {
    status: false,
    message: ''
  }
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
    default:
      return state;
  }
}
