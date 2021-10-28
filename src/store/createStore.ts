import { createStore, applyMiddleware, Middleware, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { LoginState } from "../store";
import { BaseState } from "./modules/base/types";
import { CompaniesState, DimensionsState, LoginTypeKeys } from "./modules/exportTypes";
import { QuestionariesState } from "./modules/questionaries/types";
import { QuestionsState } from "./modules/questions/types";
import { ResultsState } from "./modules/results/types";
import { UsersState } from "./modules/users/types";
import { CollaboratorState } from './modules/collaborator/types'

export interface RootState {
  base: BaseState;
  login: LoginState;
  companies: CompaniesState;
  dimensions: DimensionsState;
  results: ResultsState;
  questionaries: QuestionariesState;
  users: UsersState;
  questions: QuestionsState;
  collaborator: CollaboratorState;
}
const resetEnhancer = (rootReducer: Reducer) => (state: any, action: any) => {
  if (action.type !== LoginTypeKeys.RESET_STORE) return rootReducer(state, action);

  const newState = rootReducer(undefined, { type: '' });
  return newState;
};

const store = (reducers: Reducer, middlewares: Middleware[]) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(resetEnhancer(reducers), composeWithDevTools(enhancer));
};


export default store