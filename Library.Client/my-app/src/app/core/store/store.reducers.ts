
import { List } from 'immutable';
import { Book } from "../models/book";
import { combineReducers } from 'redux';
import { books } from './reducers/book.reducers';
import { genres } from './reducers/genre.reducers';
import { booksHistory } from './reducers/book-history.reducers';

const storeReducers = combineReducers({
  books,
  genres,
  booksHistory
});

export { storeReducers };
