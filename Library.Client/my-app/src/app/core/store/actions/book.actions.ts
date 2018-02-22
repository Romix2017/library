
import { List } from 'immutable';
import { Book } from "../../models/book";

export const LOAD_BOOKS = "LOAD_BOOKS";
export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const BACKEND_ACTION_STARTED = "BACKEND_ACTION_STARTED";
export const BACKEND_ACTION_FINISHED = "BACKEND_ACTION_FINISHED";


export function loadBooks(books: List<Book>) {
  return {
    type: LOAD_BOOKS,
    books: books
  }
}

export function addBook(newBook: Book) {
  return {
    type: ADD_BOOK,
    newBook
  }
}

export function updateBook(book: Book) {

  return {
    type: UPDATE_BOOK,
    book
  }
}


export function deleteBook(book: Book) {
  return {
    type: DELETE_BOOK,
    book
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
