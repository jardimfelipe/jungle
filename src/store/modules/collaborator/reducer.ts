import { CollaboratorState, CollaboratorAction, CollaboratorTypeKeys }  from './types'

const INITIAL_STATE: CollaboratorState = {
    collaborator: []    
}

export default function Reducer(
    state: CollaboratorState = INITIAL_STATE,
    action: CollaboratorAction
): CollaboratorState {
    switch (action.type){
        case CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST:
            return {
                ...state,
                collaborator: [...state.collaborator, action.payload]
            }
        case CollaboratorTypeKeys.DELETE_COLLABORATOR_REQUEST:
            return {
                ...state
            }
        case CollaboratorTypeKeys.EDIT_COLLABORATOR_REQUEST:
            return {
                ...state
            }
        case CollaboratorTypeKeys.INACTIVE_COLLABORATOR_REQUES:
            return {
                ...state
            }
        default:
            return state
    }
}

