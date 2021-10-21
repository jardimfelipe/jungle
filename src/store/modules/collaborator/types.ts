import { RequestError } from "../exportTypes"
import * as actions from "./actions"
import { ActionType } from 'typesafe-actions'

export enum CollaboratorTypeKeys {
    CREATE_COLLABORATOR_REQUEST = "@users/CREATE_COLLABORATOR_REQUEST",
    CREATE_COLLABORATOR_SUCCESS = "@users/CREATE_COLLABORATOR_SUCCESS",
    CREATE_COLLABORATOR_FAILURE = "@users/CREATE_COLLABORATOR_FAILURE",
    
    GET_COLLABORATOR_REQUEST = "@users/GET_COLLABORATOR_REQUEST",
    
    DELETE_COLLABORATOR_REQUEST = "@users/DELETE_COLLABORATOR_REQUEST",
    DELETE_COLLABORATOR_SUCCESS = "@users/DELETE_COLLABORATOR_SUCCESS",
    DELETE_COLLABORATOR_FAILURE = "@users/DELETE_COLLABORATOR_FAILURE"
}

export type Collaborator = {
    name: String,
    email: String,
    unity: String,
    type_position: String,
    office: String,
    people_leader: String,
    department: String,
    direct_manager_email: String
}

export type CollaboratorAction = ActionType<typeof actions>;

export type CollaboratorState = {
    users: Collaborator[];
    error: RequestError;
}

export type GerCollaboratorParams = {
    headers: {
        company: String,
    }
}

export type DeleteCollaboratorParams = {
    user: Collaborator;
    company?: string,
}