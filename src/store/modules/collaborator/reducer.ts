import { CollaboratorAction, CollaboratorState } from './types'

const INITIAL_STATE: CollaboratorState = {
    users: [],
    error: { 
        status: false,
        message: ''
    }
}

export default function Reducer(
    state: CollaboratorState = INITIAL_STATE,
    action: CollaboratorAction    
): CollaboratorState {
    switch (action.type){
        case CollaboratorTypeKeys.GET:
            return 
    }
}