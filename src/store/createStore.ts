import { createStore, applyMiddleware, Middleware, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { LoginState } from "../store";
import { BaseState } from "./modules/base/types";
import { CompaniesState, DimensionsState, LoginTypeKeys } from "./modules/exportTypes";
import { QuestionariesState } from "./modules/questionaries/types";
import { ResultsState } from "./modules/results/types";
import { UsersState } from "./modules/users/types";

export interface RootState {
  base: BaseState;
  login: LoginState;
  companies: CompaniesState;
  dimensions: DimensionsState;
  results: ResultsState;
  questionaries: QuestionariesState;
  users: UsersState;
}
const resetEnhancer = (rootReducer: Reducer) => (state: any, action: any) => {
  if (action.type !== LoginTypeKeys.RESET_STORE) return rootReducer(state, action);

  const newState = rootReducer(undefined, { type: '' });
  newState.router = state.router;
  return newState;
};

const store = (reducers: Reducer, middlewares: Middleware[]) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(resetEnhancer(reducers), composeWithDevTools(enhancer));
};


export default store