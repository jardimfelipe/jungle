import { CollaboratorState, CollaboratorAction, CollaboratorTypeKeys }  from './types'


const INITIAL_STATE: CollaboratorState = {
    collaborator: [],
    isConcluded: false,
    error: {
        status: false,
<<<<<<< HEAD
        message: ''
    },
    feedback: { 
        status: 'success',
        message: ''
    } 
}
  
=======
        message: '',
        type: ''
    },
    feedback: { 
        status: 'success',
        message: '',
        type: ''
    } 
}
   
>>>>>>> origin/jungle-collaborator
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
        case CollaboratorTypeKeys.GET_ERROR:
            return {
                ...state,
                error: {
                    status: action.payload.status,
<<<<<<< HEAD
                    message: action.payload.message
=======
                    message: action.payload.message,
                    type: action.payload.type,
>>>>>>> origin/jungle-collaborator
                }
            }
        case CollaboratorTypeKeys.GET_FEEDBACK:
            return {
                ...state,
                feedback: { 
                    status: action.payload.status,
<<<<<<< HEAD
                    message: action.payload.message
=======
                    message: action.payload.message,
                    type: action.payload.type
                }
            }
        case CollaboratorTypeKeys.CLEAR_FEEDBACK:
            return {
                ...state,
                feedback: { 
                    status: '', 
                    message: '',
                    type: ''
                }
            }
        case CollaboratorTypeKeys.CLEAR_ERROR:
            return {
                ...state,
                error: {
                    status: false,
                    message: '',
                    type: ''
>>>>>>> origin/jungle-collaborator
                }
            }
        default:
            return state
    }
}
 
