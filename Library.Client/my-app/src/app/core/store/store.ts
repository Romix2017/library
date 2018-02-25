import { Injectable } from '@angular/core';
import { createStore, applyMiddleware } from 'redux';
import { storeReducers } from './store.reducers';
import { List } from 'immutable';
import * as Logger from 'redux-logger';
import { ReduxStore } from 'angular2-redux-store';
import { Book } from '../models/book';

const logger = Logger.createLogger({
  stateTransformer: (state) => {
    return {
      books: state.books,
      genres: state.genres,
      booksHistory: state.booksHistory
    }
  }
});

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(
  storeReducers,
  {
    books: List([]),
    genres: List([]),
    booksHistory: List([])
  });


@Injectable()
export class AppStore extends ReduxStore {

  constructor() {
    super(store);
  }

}
