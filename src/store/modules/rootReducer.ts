import { combineReducers } from "redux";
import { RootState } from "../createStore";
import login from "./login/reducer";
import companies from "./companies/reducer";
import dimensions from "./dimensions/reducer";
import base from "./base/reducer";
import results from "./results/reducer";
import questionaries from "./questionaries/reducer";

export default combineReducers<RootState>({
  login,
  companies,
  dimensions,
  base,
  results,
  questionaries
});