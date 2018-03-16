import { BookHistory } from "../../models/book-history";
import { List } from "immutable";
import { LOAD_BOOKSHISTORY, ADD_BOOKHISTORY, DELETE_BOOKHISTORY, UPDATE_BOOKHISTORY } from "../actions/book-history.actions";




export function booksHistory(state: List<BookHistory>, action: any) {
  if (!state) {
    return List([]);
  }
  switch (action.type) {
    case LOAD_BOOKSHISTORY:
      return List(action.booksHistory);
    case ADD_BOOKHISTORY:
      return state.push(action.newBookHistory);
    case DELETE_BOOKHISTORY:
      let index = state.findIndex((bookHistory) => bookHistory.Id === action.bookHistory.Id);
      return state.delete(index);
    case UPDATE_BOOKHISTORY:
      let indexUpd = state.findIndex((bookHistory) => bookHistory.Id === action.bookHistory.Id);
      return state.map((item: BookHistory, index) => {
        if (index !== indexUpd) {
          return item;
        }
        return new BookHistory({
          Id: action.bookHistory.Id, BookId: action.bookHistory.BookId,
          DateGiven: action.bookHistory.DateGiven,
          DateReturned: action.bookHistory.DateReturned,
          BookName: action.bookHistory.BookName,
          LibraryUserId: action.bookHistory.LibraryUserId,
          LibraryUserName: action.bookHistory.LibraryUserName
        });
      });
    default:
      return state;
  }
}
