import { all, call, put, takeLatest } from 'redux-saga/effects';
import { action, ActionType } from "typesafe-actions";
import api from "../../../services/api";
import * as actions from './actions'
import * as actionsUsers from '../users/actions'
import { CollaboratorEdit, CollaboratorTypeKeys } from './types';
import { createCollaboratorRequest } from './actions';
  
function* createCollaborator({payload}: ActionType<typeof actions.createCollaboratorRequest>): any {
  try{      
      const { data } = yield call(api, `/users/`, {
        method: 'POST', 
        data: {...payload}
      })
      console.warn('Colaborador: ', data)
      yield put(actions.getCollaboratorSuccess())
    }
    catch(error){
        if(error instanceof Error){
          console.error('Colaborador:', error.message, '\n', error)
          yield put(actions.getCollaboratorFail())
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
    yield put(actions.getCollaboratorSuccess())
    
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborador:', error.message, '\n', error)
      yield put(actions.getCollaboratorFail())      
    }
  }
}

function* inactivateCollaborator({payload}: ActionType<typeof actions.inactivateCollaboratorRequest>): any{
  try{
    const { data } = yield call(api, `/users/${payload._id}`, {
      method: 'PUT',
      data: {...payload }
    })
    console.warn('Colaborador: ', data)
    yield put(actions.getCollaboratorSuccess())
    
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborador:', error.message, '\n', error)
      yield put(actions.getCollaboratorFail())
    }
  }
}

function* getAllUsers(){
  try{
    const { data } = yield call(api, "/users/", {
      method: 'GET'
    })
    yield put(actionsUsers.getUsersSuccess(data))
    yield put(actions.getCollaboratorSuccess())
  }
  catch(error){
    if(error instanceof Error){
        yield put(actions.getCollaboratorFail())
    }
  }
}

function* deleteCollaborator({payload}: ActionType<typeof actions.deleteCollaboratorRequest>): any{
  try{
    const { data } = yield call(api, `/users/${payload._id}`, {
      method: 'DELETE'
    })
    console.warn('Colaborador', data)
    yield put(actions.getCollaboratorSuccess())
    
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborador', error.message, '\n', error)
      yield put(actions.getCollaboratorFail())
    } 
  }
}


export default all([ 
  takeLatest(CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST, createCollaborator),
  takeLatest(CollaboratorTypeKeys.DELETE_COLLABORATOR_REQUEST, deleteCollaborator),
  takeLatest(CollaboratorTypeKeys.EDIT_COLLABORATOR_REQUEST, editCollaborator),
  takeLatest(CollaboratorTypeKeys.INACTIVE_COLLABORATOR_REQUES, inactivateCollaborator),
  takeLatest(CollaboratorTypeKeys.GET_ALL_USERS, getAllUsers)
])