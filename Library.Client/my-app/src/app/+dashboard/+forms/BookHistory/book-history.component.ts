import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { AppStore } from '../../../core/store/store'
import { List } from 'immutable';
import { loadBooks, deleteBook } from '../../../core/store/actions/book.actions';
import { BookHistoryService } from '../../../core/services/book-history.service';
import { BookHistory } from '../../../core/models/book-history';
import { loadBooksHistory, deleteBookHistory } from '../../../core/store/actions/book-history.actions';

@Component({
  selector: 'book-history-widget',
  templateUrl: './book-history.component.html',
})
export class BookHistoryComponent implements OnInit {

  private _service: BookHistoryService;
  public BooksHistory: List<Book>;
  public BookStore: List<Book>

  constructor(service: BookHistoryService, public store: AppStore) {

    this._service = service;
    this._service.getAll()
      .subscribe(res => {
        let booksHistory = (res.data).map((bookHistory: any) =>
          new BookHistory(<BookHistory>{
            Id: bookHistory.id, BookId: bookHistory.bookId, DateGiven: bookHistory.dateGiven,
            DateReturned: bookHistory.dateReturned,
            UserId: null
          }));


        console.log(booksHistory);
        store.dispatch(loadBooksHistory(List(booksHistory)));
      }, err => console.log("Error retriving BooksHistory"));

    store.subscribe((state: any) => console.log("New state received"));

  }

  deleteItem(event) {
    event.stopPropagation();
    let bookHistoryToDelete: BookHistory = this.getItemByEvent(event);

    console.log(bookHistoryToDelete + "delete this thing");

    this._service.deleteItem(bookHistoryToDelete, this._service.createUrlParams(bookHistoryToDelete)).subscribe(
      res => {
        let removedBookHistory = res.json().dto;

        console.log(removedBookHistory + "removed books");

        this.store.dispatch(deleteBookHistory(new BookHistory(<BookHistory>{
          Id: removedBookHistory.id, DateGiven: removedBookHistory.dateGiven,
          DateReturned: removedBookHistory.dateReturned,
          UserId: null
        })));
      }, err => {
        console.log("Error retriving BooksHistory");
      });
  }

  updateItem(event) {

    this._service.emitItemForUpdate(this.getItemByEvent(event));
  }

  getItemByEvent(event: any): BookHistory {

    let targetId = event.currentTarget.getAttribute('data-itemid');
    let booksHistory = this.store.getState().booksHistory;
    let Items: List<BookHistory> = booksHistory.filter((bookHistory: BookHistory) => bookHistory.Id == targetId);
    return Items.get(0);
  }


  ngOnInit() {
  }

}
