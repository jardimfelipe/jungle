import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export enum CollaboratorTypeKeys {
  GET_COLLABORATOR_SUCCESS = "@users/GET_COLLABORATOR_SUCCESS",
  GET_COLLABORATOR_FAIL = "@users/GET_COLLABORATOR_FAIL",
  GET_ALL_USERS = "@users/GET_ALL_USERS",

  CREATE_COLLABORATOR_REQUEST = "@users/CREATE_COLLABORATOR_REQUEST",
  DELETE_COLLABORATOR_REQUEST = "@users/DELETE_COLLABORATOR_REQUEST",
  EDIT_COLLABORATOR_REQUEST = "@users/EDIT_COLLABORATOR_REQUEST",
  INACTIVE_COLLABORATOR_REQUEST = "@users/INACTIVE_COLLABORATOR_REQUES",
  SEND_COLLABORATOR_EMAIL_REQUEST = "@users/SEND_COLLABORATOR_EMAIL_REQUEST" 

}

export type Collaborator = {
  company: string,
  name: string,
  unity: string,
  office: string,
  people_leader: string,
  email: string,
  type_position: string,
  department: string,
  direct_manager_email: string,
  cpf: string, 
  rne: string, 
  password: string,
  genere: string,
  age: string,
  house_time: string, 
  education: string,  
  ethnicity: string,
  sexual_orientation: string,
  marital_status: string,
  sons: string,
  phone: string, 
  photo: string, 
  role: string,
  active: boolean | undefined
}

export type CollaboratorId = {
  _id: string
}

export type CollaboratorEmail = {
  email: string
}

export type CollaboratorInactive = {
  _id: string,
  company: string,
  name: string,
  unity: string,
  office: string,
  people_leader: string,
  email: string,
  type_position: string,
  department: string,
  direct_manager_email: string,
  cpf: string, 
  rne: string, 
  password: string,
  genere: string,
  age: string,
  house_time: string, 
  education: string,  
  ethnicity: string,
  sexual_orientation: string,
  marital_status: string,
  sons: string,
  phone: string, 
  photo: string, 
  role: string,
  active: boolean | undefined,
  first_access: boolean
}

export type CollaboratorEdit = {
  _id: string,
  company: string,
  name: string,
  unity: string,
  office: string,
  people_leader: string,
  email: string,
  type_position: string,
  department: string,
  direct_manager_email: string,
  cpf: string, 
  rne: string, 
  password: string,
  genere: string,
  age: string,
  house_time: string, 
  education: string,  
  ethnicity: string,
  sexual_orientation: string,
  marital_status: string,
  sons: string,
  phone: string, 
  photo: string, 
  role: string,
  active: boolean | undefined,
  first_access: boolean
}
 


export type CollaboratorAction = ActionType<typeof actions>

export type CollaboratorState = {
  collaborator: Collaborator[];
  isConcluded: boolean;
} 