import { takeLatest, all, call, put } from 'redux-saga/effects';
import * as Effects from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import api from '../../../services/api';
import * as actions from './actions';
import { Collaborator, CollaboratorsTypeKeys } from './types';

const hackyCall: any = Effects.call;

function* getCollaborators() {
    try{
        const { data } = yield call(api, '/users')
        yield put(actions.getCollaboratorsSuccess(data))
    }catch(error){
        if(error instanceof Error){
            console.log(error);
        }
    }
}
 
function* createCollaborator({payload}: ActionType<typeof actions.createCollaboratorsRequest>){
    try{
        yield call(api, '/users', {method: "POST", data: { ...payload, active: true}})
        yield put(actions.createCollaboratorsSuccess())
        yield put(actions.getCollaboratorRequest())
    }catch(error){
        if(error instanceof Error){
            yield put(actions.createCollaboratorFailure({message: "Ocorreu um erro, tente novamente", status: false}))
        }
    }
}


export default all([
    takeLatest(CollaboratorsTypeKeys.GET_COLLABORATORS_REQUEST, getCollaborators),
    takeLatest(CollaboratorsTypeKeys.CREATE_COLLABORATORS_REQUEST, createCollaborator)
])  