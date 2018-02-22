
import { List } from 'immutable';
import { Genre } from "../../models/genre";
import { ADD_GENRE, DELETE_GENRE, LOAD_GENRES, BACKEND_ACTION_STARTED, BACKEND_ACTION_FINISHED, UPDATE_GENRE } from '../actions/genre.actions';
import { combineReducers } from 'redux';

export function genres(state: List<Genre>, action: any) {
  if (!state) {
    return List([]);
  }
  switch (action.type) {
    case LOAD_GENRES:
      return List(action.genres);
    case ADD_GENRE:
      return state.push(action.newGenre);
    case DELETE_GENRE:
      let index = state.findIndex((genre) => genre.Id === action.genre.Id);
      return state.delete(index);
    case UPDATE_GENRE:
      let index2 = state.findIndex((item) => item.Id === action.genre.Id);
      return state.map((item, index) => {
        if (index !== index2) {
          return item;
        }
        return new Genre({ Id: action.genre.Id,  Name: action.genre.Name });
      });
    default:
      return state;
  }
}



