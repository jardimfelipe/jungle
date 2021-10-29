import { action } from 'typesafe-actions'
import { Collaborator, CollaboratorError, CollaboratorEdit, CollaboratorEmail, CollaboratorId, CollaboratorInactive, CollaboratorTypeKeys, CollaboratorFeedback } from './types'

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
  return action(CollaboratorTypeKeys.INACTIVE_COLLABORATOR_REQUEST, params)
} 

export function getCollaboratorSuccess(){
  return action(CollaboratorTypeKeys.GET_COLLABORATOR_SUCCESS)
}

export function getCollaboratorFail(){
  return action(CollaboratorTypeKeys.GET_COLLABORATOR_FAIL);
}
 
export function getError(params: CollaboratorError){
  return action(CollaboratorTypeKeys.GET_ERROR, params);
}

export function getFeedback(params: CollaboratorFeedback){
  return action(CollaboratorTypeKeys.GET_FEEDBACK, params);
}

export function clearFeedback(){
  return action(CollaboratorTypeKeys.CLEAR_FEEDBACK);
}
export function clearError(){
  return action(CollaboratorTypeKeys.CLEAR_ERROR);
}

export function getAllUsers(){
  return action(CollaboratorTypeKeys.GET_ALL_USERS)
}

export function sendCollaboratorEmailRequest(params: CollaboratorEmail){
  return action(CollaboratorTypeKeys.SEND_COLLABORATOR_EMAIL_REQUEST, params)
} 