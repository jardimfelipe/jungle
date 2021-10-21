import { takeLatest, all, call, put, take } from 'redux-saga/effects'
import api from '../../../services/api';
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { CollaboratorTypeKeys } from './types';

function* getCollaborator(){
    try {
        const { data } = yield call(api, '/users')
        yield put(actions.getCollaboratorSuccess(data))
    }
    catch(error){
        if(error instanceof Error){
            console.log(error)
        }
    }
}


function* createCollaborator({ payload }: ActionType<typeof actions.createCollaboratorRequest>): any {
    try {
        yield call(api, `/users`, { method: 'POST', data: { ...payload, activate: true } })
        yield put(actions.createCollaboratorSuccess())
        yield put(actions.getCollaboratorRequest())
    }
    catch(error){
        if(error instanceof Error){
            yield put(actions.createCollaboratorFailure({message: 'Ocorreu um erro, tente novamente mais tarde', status: true}))
            console.log(error)
        }

    }
}

function* deleteCollaborator({ payload }: ActionType<typeof actions.deleteCollaboratorRequest>){
    try{
       yield call(api, `/users/${payload}`, { method: 'DELETE'})
       yield put(actions.deleteCollaboratorSuccess()) 
       yield put(actions.getCollaboratorRequest())
    }
    catch(error){
        if(error instanceof Error){
            yield put(actions.deleteCollaboratorFailure({message: 'Ocorreu um erro, tente novamente', status: true}))
        }
    }
}

export default all([
    takeLatest(CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST, createCollaborator),
    takeLatest(CollaboratorTypeKeys.GET_COLLABORATOR_REQUEST, getCollaborator),
    takeLatest(CollaboratorTypeKeys.DELETE_COLLABORATOR_REQUEST, deleteCollaborator)
])
