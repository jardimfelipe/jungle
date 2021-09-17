import { ActionType } from "typesafe-actions";
import * as actions from './actions'
import { RequestError, RequestFeedback } from "../exportTypes";

export enum CollaboratorsTypeKeys {
    GET_COLLABORATORS_REQUEST = "@user/GET_COLLABORATORS_REQUEST",
    GET_COLLABORATORS_SUCCESS = "@user/GET_COLLABORATORS_SUCCESS",

    CREATE_COLLABORATORS_REQUEST = "@user/CREATE_COLLABORATORS_REQUEST",
    CREATE_COLLABORATOR_SUCCESS = "@user/CREATE_COLLABORATOR_SUCCESS",
    CREATE_COLLABORATOR_FAILURE = "@user/CREATE_COLLABORATOR_FAILURE",
    
    RESET_COLLABORATOR_ERRORS = "@user/RESET_COLLABORATOR_ERRORS"
} 

export type CollaboratorAction = ActionType<typeof actions>;

export type Collaborator = {
    name: String,
    email: String,
    typeOfPositions: String,
    emailGestor: String,
    unityOrLocalization: String,
    positions: String,
    peopleLeader: String,
    areaOrDepartanentOrDirectory: String
}

export type CollaboratorState = {
    collaborators: Collaborator[];
    isLoading: boolean;
    feedback: RequestError;
}
 
 