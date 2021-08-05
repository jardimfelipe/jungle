// shared types
export interface RequestParams {
  pageNumber?: number
}

export type RequestError = {
  status: boolean;
  message: string;
}



export * from "../createStore";
export * from "./login/types";
export * from "./companies/types";
export * from "./dimensions/types";
