import { all, AllEffect, ForkEffect } from "redux-saga/effects";
import login from "./login/sagas";
import companies from "./companies/sagas";
import dimensions from "./dimensions/sagas";
import results from "./results/sagas";
import questionaries from "./questionaries/sagas";
import users from "./users/sagas";
import questions from "./questions/sagas";
import collaborators from './collaborators/sagas';

export default function* rootSaga(): Generator<
  AllEffect<AllEffect<ForkEffect<never>>>,
  unknown,
  unknown
> {
  return yield all([login, companies, dimensions, results, questionaries, users, questions, collaborators]);
}
