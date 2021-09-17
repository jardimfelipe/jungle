// shared types
export interface RequestParams {
  pageNumber?: number
}

export type Feedbacks = 'error' | 'success' | ''

export type RequestError = {
  status: boolean;
  message: string;
}

export type RequestFeedback = {
  status: Feedbacks;
  message: string
}


export * from "../createStore";
export * from "./login/types";
export * from "./companies/types";
export * from "./dimensions/types";
export * from './collaborators/types';
