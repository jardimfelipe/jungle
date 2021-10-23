import { action } from 'typesafe-actions'
import { Collaborator, CollaboratorTypeKeys } from './types'

export function createCollaboratorRequest(params: Collaborator){
  return action(CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST, params)
}