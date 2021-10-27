import { CollaboratorState, CollaboratorAction, CollaboratorTypeKeys }  from './types'

const INITIAL_STATE: CollaboratorState = {
    collaborator: [],
    isConcluded: false  
}
 
export default function Reducer(
    state: CollaboratorState = INITIAL_STATE,
    action: CollaboratorAction
): CollaboratorState {
    switch (action.type){
        case CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST:
            return {
                ...state,
                collaborator: [...state.collaborator, action.payload],
                isConcluded: true
            }
        case CollaboratorTypeKeys.DELETE_COLLABORATOR_REQUEST:
            return {
                ...state,
                isConcluded: true
            }
        case CollaboratorTypeKeys.EDIT_COLLABORATOR_REQUEST:
            return {
                ...state,
                isConcluded: true
            }
        case CollaboratorTypeKeys.INACTIVE_COLLABORATOR_REQUEST:
            return {
                ...state,
                isConcluded: true
            }
        case CollaboratorTypeKeys.GET_COLLABORATOR_SUCCESS:
            return {
                ...state,
                isConcluded: false
            }
        case CollaboratorTypeKeys.SEND_COLLABORATOR_EMAIL_REQUEST:
            return {
                ...state, 
                isConcluded: true
            }
        case CollaboratorTypeKeys.GET_COLLABORATOR_FAIL:
            return {
                ...state,
                isConcluded: true
            }
        default:
            return state
    }
}
 
