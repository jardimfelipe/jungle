// shared types
export interface RequestParams {
  pageNumber?: number
}

export type Feedbacks = 'error' | 'success' | ''

export type RequestError = {
  status: boolean;
  message: string;
<<<<<<< HEAD
=======
  type?: string;
>>>>>>> origin/jungle-collaborator
}

export type RequestFeedback = {
  status: Feedbacks;
<<<<<<< HEAD
  message: string
=======
  message: string;
  type?: string;
>>>>>>> origin/jungle-collaborator
}


export * from "../createStore";
export * from "./login/types";
export * from "./companies/types";
export * from "./dimensions/types";
