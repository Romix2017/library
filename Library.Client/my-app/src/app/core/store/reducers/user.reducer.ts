import { combineReducers } from 'redux';
import { User } from '../../models/user';
import { List } from 'immutable';
import { LOAD_USERS, ADD_USER, DELETE_USER, UPDATE_USER } from '../actions/user.actions';

export function users(state: List<User>, action: any) {
  if (!state) {
    return List([]);
  }
  switch (action.type) {
  case LOAD_USERS:
    return List(action.users);
  case ADD_USER:
    return state.push(action.newUser);
  case DELETE_USER:
    let index = state.findIndex((user) => user.Id === action.user.Id);
    return state.delete(index);
  case UPDATE_USER:
    let index2 = state.findIndex((item) => item.Id === action.user.Id);
    return state.map((item, index) => {
      if (index !== index2) {
        return item;
      }
      return new User({ Id: action.user.Id, Name: action.user.Name, Email: action.user.Email });
    });
  default:
    return state;
  }
}
