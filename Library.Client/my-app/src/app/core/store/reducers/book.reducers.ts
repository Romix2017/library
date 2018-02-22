
import { List } from 'immutable';
import { Book } from "../../models/book";
import { ADD_BOOK, DELETE_BOOK, LOAD_BOOKS, BACKEND_ACTION_STARTED, BACKEND_ACTION_FINISHED, UPDATE_BOOK } from '../actions/book.actions';
import { combineReducers } from 'redux';

export function books(state: List<Book>, action: any) {
  if (!state) {
    return List([]);
  }
  switch (action.type) {
    case LOAD_BOOKS:
      return List(action.books);
    case ADD_BOOK:
      return state.push(action.newBook);
    case DELETE_BOOK:
      let index = state.findIndex((book) => book.Id === action.book.Id);
      return state.delete(index);
    case UPDATE_BOOK:
      let index2 = state.findIndex((book) => book.Id === action.book.Id);
      return state.map((item: Book, index) => {
        if (index !== index2) {
          return item;
        }
        return new Book({ Id: action.book.Id, GenreId: action.book.GenreId, Name: action.book.Name });
      });
    default:
      return state;
  }
}



