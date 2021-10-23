import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from './actions'
import { CollaboratorTypeKeys } from './types';
import { createCollaboratorRequest } from './actions';

function* createCollaborator({payload}: ActionType<typeof actions.createCollaboratorRequest>): any {
    try{
      const { data } = yield call(api, `/users/`, {
        method: 'POST', 
        data: {...payload}
      })
      console.warn('usuário: ', data)
    }
    catch(error){
        if(error instanceof Error){
            console.error('usuário: ', error)
        }
    }
}

export default all([ 
  takeLatest(CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST, createCollaborator)
])