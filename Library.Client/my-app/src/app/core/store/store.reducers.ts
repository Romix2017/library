
import { List } from 'immutable';
import { Book } from "../models/book";
import { combineReducers } from 'redux';
import { books } from './reducers/book.reducers';
import { genres } from './reducers/genre.reducers';
import { booksHistory } from './reducers/book-history.reducers';
import { users } from './reducers/user.reducer';

const storeReducers = combineReducers({
  books,
  genres,
  booksHistory,
  users
});

export { storeReducers };
