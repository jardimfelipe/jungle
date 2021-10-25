import { action } from 'typesafe-actions'
import { Collaborator, CollaboratorEdit, CollaboratorId, CollaboratorInactive, CollaboratorTypeKeys } from './types'

export function createCollaboratorRequest(params: Collaborator){
  return action(CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST, params)
}

export function deleteCollaboratorRequest(params: CollaboratorId){
  return action(CollaboratorTypeKeys.DELETE_COLLABORATOR_REQUEST, params)
} 

export function editCollaboratorRequest(params: CollaboratorEdit){
  return action(CollaboratorTypeKeys.EDIT_COLLABORATOR_REQUEST, params);
}

export function inactivateCollaboratorRequest(params: CollaboratorInactive){
  return action(CollaboratorTypeKeys.INACTIVE_COLLABORATOR_REQUES, params)
}