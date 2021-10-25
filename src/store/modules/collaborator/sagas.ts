import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from './actions'
import { CollaboratorEdit, CollaboratorTypeKeys } from './types';
import { createCollaboratorRequest } from './actions';
  
function* createCollaborator({payload}: ActionType<typeof actions.createCollaboratorRequest>): any {
  try{      
      const { data } = yield call(api, `/users/`, {
        method: 'POST', 
        data: {...payload}
      })
      console.warn('Colaborador: ', data)
    }
    catch(error){
        if(error instanceof Error){
            console.error('Colaborador:', error.message, '\n', error)
        }
    }
}

function* editCollaborator({payload}: ActionType<typeof actions.editCollaboratorRequest>): any{
  try{
    const { data } = yield call(api, `/users/${payload._id}`, {
      method: 'PUT',
      data: {...payload}
    })
    console.warn('Colaborador: ', data )
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborador:', error.message, '\n', error)
    }
  }
}

function* inactivateCollaborator({payload}: ActionType<typeof actions.inactivateCollaboratorRequest>): any{
  
}

function* deleteCollaborator({payload}: ActionType<typeof actions.deleteCollaboratorRequest>): any{
  try{
    const { data } = yield call(api, `/users/${payload._id}`, {
      method: 'DELETE'
    })
    console.warn('Colaborador', data)
  }
  catch(error){
    if(error instanceof Error){
      console.error('Caolaborador', error.message, '\n', error)
    }
  }
}

export default all([ 
  takeLatest(CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST, createCollaborator),
  takeLatest(CollaboratorTypeKeys.DELETE_COLLABORATOR_REQUEST, deleteCollaborator),
  takeLatest(CollaboratorTypeKeys.EDIT_COLLABORATOR_REQUEST, editCollaborator)
])