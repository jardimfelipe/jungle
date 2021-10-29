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
<<<<<<< HEAD
      yield put(actions.getFeedback({ message: 'Sucesso ao criar o colaborador', status: 'success' }))
=======
      yield put(actions.getFeedback({ message: 'Colaborador cadastrado com sucesso', type: 'cadastrar' , status: 'success'}))
>>>>>>> origin/jungle-collaborator
      yield put(actions.getCollaboratorSuccess())
    }
    catch(error){
        if(error instanceof Error){
          console.error('Colaborador:', error.message, '\n', error)
          yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
          yield put(actions.getCollaboratorFail())
        }
    }
<<<<<<< HEAD
}
=======

} 
>>>>>>> origin/jungle-collaborator

function* sendCollaboratorEmail({payload}: ActionType<typeof actions.sendCollaboratorEmailRequest>) :any {
  try{
    const { data } = yield call(api, `/users/resend-code`, {
      method: 'POST', 
      data: {...payload}
    })
    console.warn('Collaborador', data)
<<<<<<< HEAD
    yield put(actions.getFeedback({ message: 'Sucesso ao criar o colaborador', status: 'success' }))
=======
    yield put(actions.getFeedback({ message: 'E-mail enviado com sucesso', type: 'email', status: 'success' }))
>>>>>>> origin/jungle-collaborator
    yield put(actions.getCollaboratorSuccess())
  }
  catch(error){
    if(error instanceof Error){
      console.error('Collaborador:', error.message, '\n', error)
      yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
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
<<<<<<< HEAD
    yield put(actions.getFeedback({ message: 'Sucesso ao criar o colaborador', status: 'success' }))
=======
    yield put(actions.getFeedback({ message: 'Colaborador editado com sucesso', type: 'editar' , status: 'success' }))
>>>>>>> origin/jungle-collaborator
    yield put(actions.getCollaboratorSuccess())
    
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborador:', error.message, '\n', error)
      yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
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
<<<<<<< HEAD
    yield put(actions.getFeedback({ message: 'Sucesso ao criar o colaborador', status: 'success' }))
=======
    yield put(actions.getFeedback({ message: 'Colaborador inativado!', type: 'inativar' , status: 'success' }))
>>>>>>> origin/jungle-collaborator
    yield put(actions.getCollaboratorSuccess())
    
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborador:', error.message, '\n', error)
<<<<<<< HEAD
      yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
=======
      yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true, type: 'inativar' }))
>>>>>>> origin/jungle-collaborator
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
<<<<<<< HEAD
    yield put(actions.getFeedback({ message: 'Sucesso ao criar o colaborador', status: 'success' }))
=======
>>>>>>> origin/jungle-collaborator
    yield put(actions.getCollaboratorSuccess())
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborator', error.message, '\n', error)
<<<<<<< HEAD
      yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
=======
      // yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
>>>>>>> origin/jungle-collaborator
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
<<<<<<< HEAD
    yield put(actions.getFeedback({ message: 'Sucesso ao criar o colaborador', status: 'success' }))
=======
    yield put(actions.getFeedback({ message: 'Colaborador apagado com sucesso', status: 'success', type: 'deletar' }))
>>>>>>> origin/jungle-collaborator
    yield put(actions.getCollaboratorSuccess())
    
  }
  catch(error){
    if(error instanceof Error){
      console.error('Colaborador', error.message, '\n', error)
<<<<<<< HEAD
      yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
=======
      //yield put(actions.getError({ message: 'Erro ao criar o colaborador', status: true }))
>>>>>>> origin/jungle-collaborator
      yield put(actions.getCollaboratorFail())
    } 
  }
}


export default all([ 
  takeLatest(CollaboratorTypeKeys.CREATE_COLLABORATOR_REQUEST, createCollaborator),
  takeLatest(CollaboratorTypeKeys.DELETE_COLLABORATOR_REQUEST, deleteCollaborator),
  takeLatest(CollaboratorTypeKeys.EDIT_COLLABORATOR_REQUEST, editCollaborator),
  takeLatest(CollaboratorTypeKeys.INACTIVE_COLLABORATOR_REQUEST, inactivateCollaborator),
  takeLatest(CollaboratorTypeKeys.GET_ALL_USERS, getAllUsers),
  takeLatest(CollaboratorTypeKeys.SEND_COLLABORATOR_EMAIL_REQUEST, sendCollaboratorEmail)
])