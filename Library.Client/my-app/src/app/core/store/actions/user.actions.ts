
import { List } from 'immutable';
import { User } from '../../models/user';

export const LOAD_USERS = "LOAD_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const BACKEND_ACTION_STARTED = "BACKEND_ACTION_STARTED";
export const BACKEND_ACTION_FINISHED = "BACKEND_ACTION_FINISHED";


export function loadUsers(users: List<User>) {
  return {
    type: LOAD_USERS,
    users: users
  }
}

export function addUser(newUser: User) {
  return {
    type: ADD_USER,
    newUser
  }
}

export function updateUser(user: User) {

  return {
    type: UPDATE_USER,
    user
  }
}

export function deleteUser(user: User) {
  return {
    type: DELETE_USER,
    user
  }
}

export function startBackendAction(message: string) {
  return {
    type: BACKEND_ACTION_STARTED,
    message
  }
}

export function endBackendAction(message: string = '') {
  return {
    type: BACKEND_ACTION_FINISHED,
    message
  }
}
