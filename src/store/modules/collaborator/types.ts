import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export enum CollaboratorTypeKeys {
    CREATE_COLLABORATOR_REQUEST = "@users/CREATE_COLLABORATOR_REQUEST"
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

export type CollaboratorAction = ActionType<typeof actions>

export type CollaboratorState = {
  collaborator: Collaborator[]
} 