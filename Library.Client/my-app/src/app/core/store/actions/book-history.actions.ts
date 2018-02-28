
import { List } from 'immutable';
import { BookHistory } from "../../models/book-history";

export const LOAD_BOOKSHISTORY = "LOAD_BOOKSHISTORY";
export const ADD_BOOKHISTORY = "ADD_BOOKHISTORY";
export const DELETE_BOOKHISTORY = "DELETE_BOOKHISTORY";
export const UPDATE_BOOKHISTORY = "UPDATE_BOOKHISTORY";
export const BACKEND_ACTION_STARTED = "BACKEND_ACTION_STARTED";
export const BACKEND_ACTION_FINISHED = "BACKEND_ACTION_FINISHED";


export function loadBooksHistory(booksHistory: List<BookHistory>) {
  return {
    type: LOAD_BOOKSHISTORY,
    booksHistory: booksHistory
  }
}

export function addBookHistory(newBookHistory: BookHistory) {
  return {
    type: ADD_BOOKHISTORY,
    newBookHistory
  }
}

export function updateBookHistory(bookHistory:BookHistory) {

  return {
    type: UPDATE_BOOKHISTORY,
    bookHistory
  }
}


export function deleteBookHistory(bookHistory: BookHistory) {
  return {
    type: DELETE_BOOKHISTORY,
    bookHistory
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
