import { ActionType } from 'typesafe-actions'
import * as actions from './actions.js'
import { RequestError } from '../exportTypes'

export enum CollaboratorTypeKeys {
    GET_COLLABORATOR_REQUEST = "@collaborator/GET_COLLABORATOR_REQUEST",
    GET_COLLABORATOR_SUCCESS = "@collaborator/GET_COLLABORATOR_SUCCESS",
    GET_COLLABORATOR_FAILURE = "@collaborator/GET_COLLABORATOR_FAILURE",

    CREATE_COLLABORATOR_REQUEST = "@collaborator/CREATE_COLLABORATOR_REQUEST",
    CREATE_COLLABORATOR_SUCCESS = "@collaborator/CREATE_COLLABORATOR_SUCCESS",
    CREATE_COLLABORATOR_FAILURE = "@collaborator/CREATE_COLLABORATOR_FAILURE",

    DELETE_COLLABORATOR_REQUEST = "@collaborator/DELETE_COLLABORATOR_REQUEST",
    DELETE_COLLABORATOR_SUCCESS = "@collaborator/DELETE_COLLABORATOR_SUCCESS",
    DELETE_COLLABORATOR_FAILURE = "@collaborator/DELETE_COLLABORATOR_FAILURE",
}

export type CollaboratorAction = ActionType<typeof actions>

export type Collaborator = {
    name: String,
    unit_location: String,
    office: String,
    people_leader: String,
    email: String,
    type_of_position: String,
    area_department_board: String,
    manager_email: String
}

export type CollaboratorState = {
    collaborator: Collaborator[];

} 