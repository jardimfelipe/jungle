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
        default:
            return state
    }
}

