import { action } from 'typesafe-actions';
import { RequestError } from '../exportTypes';
import { CollaboratorsTypeKeys, Collaborator } from './types';

export function getCollaboratorRequest(){
    return action(CollaboratorsTypeKeys.GET_COLLABORATORS_REQUEST);
}

export function getCollaboratorsSuccess(params: Collaborator[]){
    return action(CollaboratorsTypeKeys.GET_COLLABORATORS_SUCCESS, params);
}
 
export function createCollaboratorsRequest(params: Object){
    return action(CollaboratorsTypeKeys.CREATE_COLLABORATORS_REQUEST, params);
}

export function createCollaboratorsSuccess(){
    return action(CollaboratorsTypeKeys.CREATE_COLLABORATOR_SUCCESS);
}

export function createCollaboratorFailure(params: RequestError){
    return action(CollaboratorsTypeKeys.CREATE_COLLABORATOR_FAILURE, params);
}

export function resetCollaboratorsErrors(){
    return action(CollaboratorsTypeKeys.RESET_COLLABORATOR_ERRORS)
}
 
 