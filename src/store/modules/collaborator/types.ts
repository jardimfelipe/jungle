import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export enum CollaboratorTypeKeys {
    CREATE_COLLABORATOR_REQUEST = "@users/CREATE_COLLABORATOR_REQUEST",
    DELETE_COLLABORATOR_REQUEST = "@users/DELETE_COLLABORATOR_REQUEST",
    EDIT_COLLABORATOR_REQUEST = "@users/EDIT_COLLABORATOR_REQUEST",
    INACTIVE_COLLABORATOR_REQUES = "@users/INACTIVE_COLLABORATOR_REQUES"
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
  role: string 
}

export type CollaboratorId = {
  _id: string
}

export type CollaboratorInactive = {
  _id: string, 
  active: boolean
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
  role: string 
}



export type CollaboratorAction = ActionType<typeof actions>

export type CollaboratorState = {
  collaborator: Collaborator[]
} 