import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { AppStore } from '../../../core/store/store'
import { List } from 'immutable';
import { loadBooks, deleteBook } from '../../../core/store/actions/book.actions';
import { BookHistoryService } from '../../../core/services/book-history.service';
import { BookHistory } from '../../../core/models/book-history';
import { loadBooksHistory, deleteBookHistory } from '../../../core/store/actions/book-history.actions';
import { Privileges } from '../../../core/settings/settings';

@Component({
  selector: 'book-history-widget',
  templateUrl: './book-history.component.html',
})
export class BookHistoryComponent implements OnInit {

  private _service: BookHistoryService;
  public BooksHistory: List<Book>;
  public BookStore: List<Book>
  public Privileges: Privileges = new Privileges();
  private _subscription: any;

  constructor(service: BookHistoryService, public store: AppStore, bookService: BookService) {
    this._service = service;
    this.getAll();

    this._subscription = bookService.finderSubject.subscribe((item) => {
      this.getAll(item);
    });
  }


  ngOnDestroy() {

    this._subscription.unsubscribe();
  }


  getAll(filter?: any) {

    this._service.getAll(filter)
      .subscribe(res => {
        let booksHistory = (res.data).map((bookHistory: any) =>
          new BookHistory(<BookHistory>{
            Id: bookHistory.id, BookId: bookHistory.bookId,
            DateGiven: bookHistory.dateGiven,
            DateReturned: bookHistory.dateReturned,
            LibraryUserId: bookHistory.libraryUserId,
            BookName: bookHistory.bookName,
            LibraryUserName: bookHistory.libraryUserName
          }));

        this.store.dispatch(loadBooksHistory(List(booksHistory)));
      }, err => console.log("Error retriving BooksHistory"));
  }

  deleteItem(event) {
    event.stopPropagation();
    let bookHistoryToDelete: BookHistory = this.getItemByEvent(event);

    this._service.deleteItem(bookHistoryToDelete, this._service.createUrlParams(bookHistoryToDelete)).subscribe(
      res => {
        let removedBookHistory = res.dto;
        this.store.dispatch(deleteBookHistory(new BookHistory(<BookHistory>{
          Id: removedBookHistory.id, DateGiven: removedBookHistory.dateGiven,
          DateReturned: removedBookHistory.dateReturned,
          LibraryUserId: removedBookHistory.libraryUserId,
          BookName: removedBookHistory.bookName,
          LibraryUserName: removedBookHistory.libraryBookName
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
    let items: List<BookHistory> = booksHistory.filter((bookHistory: BookHistory) => bookHistory.Id == targetId);
    return items.get(0);
  }


  ngOnInit() {
  }

}
