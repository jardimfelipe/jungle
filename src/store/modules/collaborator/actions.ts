import { action } from 'typesafe-actions'
import { RequestError } from '../exportTypes'
import { Collaborator, CollaboratorTypeKeys } from './types';

export function getCollaboratorSuccess(params: Collaborator[]){
    return action(CollaboratorTypeKeys.GET_COLLABORATOR_REQUEST, params);
}

export function createCollaboratorSuccess(){
    return action(CollaboratorTypeKeys.CREATE_COLLABORATOR_SUCCESS)
}

export function getCollaboratorRequest(){
    return action(CollaboratorTypeKeys.GET_COLLABORATOR_REQUEST)
}

export function createCollaboratorFailure(params: RequestError){
    return action(CollaboratorTypeKeys.CREATE_COLLABORATOR_FAILURE, params)
}

export function deleteCollaboratorSuccess(){
    return action(CollaboratorTypeKeys.DELETE_COLLABORATOR_SUCCESS)
}

export function deleteCollaboratorFailure(params: RequestError){
    return action(CollaboratorTypeKeys.DELETE_COLLABORATOR_FAILURE, params)
}

