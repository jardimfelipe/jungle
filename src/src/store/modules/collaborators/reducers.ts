import { CollaboratorAction, CollaboratorState, CollaboratorsTypeKeys } from './types'

const INITIAL_STATE: CollaboratorState = {
    collaborators: [],
    isLoading: false,
    feedback: {
        status: false, 
        message: ''
    } 
} 

export default function Reducer(
    state: CollaboratorState = INITIAL_STATE,
    action: CollaboratorAction
): CollaboratorState {
    switch(action.type){
        case CollaboratorsTypeKeys.GET_COLLABORATORS_REQUEST:
            return { ...state, isLoading: true }
        case CollaboratorsTypeKeys.GET_COLLABORATORS_SUCCESS:
            return { ...state, collaborators: action.payload, isLoading: false}
        case CollaboratorsTypeKeys.CREATE_COLLABORATORS_REQUEST:
            return { ...state, isLoading: true}
        case CollaboratorsTypeKeys.CREATE_COLLABORATOR_SUCCESS:
            return { ...state, feedback: { status: true, message: 'Collaborador cadastrado com sucesso'}, isLoading: false }
        case CollaboratorsTypeKeys.CREATE_COLLABORATOR_FAILURE:
            return { ...state, isLoading: false }
        case CollaboratorsTypeKeys.RESET_COLLABORATOR_ERRORS:
            return {
                ...state, feedback: {
                    status: false,
                    message: ''
                }
            }
        default:
            return state;
    }
} 
 