import { CollaboratorState, CollaboratorAction, CollaboratorTypeKeys }  from './types'

const INITIAL_STATE: CollaboratorState = {
    collaborator: [],
    isLoading: false  
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
        case CollaboratorTypeKeys.GET_COLLABORATOR_SUCCESS:
            return {
                ...state,
                isLoading: true
            }
        case CollaboratorTypeKeys.GET_COLLABORATOR_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}
 
