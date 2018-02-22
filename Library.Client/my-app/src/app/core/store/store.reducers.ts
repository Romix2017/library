
import { List } from 'immutable';
import { Book } from "../models/book";
import { combineReducers } from 'redux';
import { books } from './reducers/book.reducers';
import { genres } from './reducers/genre.reducers';

const storeReducers = combineReducers({
  books,
  genres
});

export { storeReducers };
