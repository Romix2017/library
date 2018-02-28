import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { AppStore } from '../../../core/store/store'
import { List } from 'immutable';
import { GenreService } from '../../../core/services/genre.service';
import { Genre } from '../../../core/models/genre';
import { loadGenres } from '../../../core/store/actions/genre.actions';
import { MutableBook } from '../../../core/models/mutable.book';
import { addBook, updateBook, loadBooks } from '../../../core/store/actions/book.actions';
import { NgForm } from '@angular/forms';
import { BookHistoryService } from '../../../core/services/book-history.service';
import { BookHistory } from '../../../core/models/book-history';
import { MutableBookHistory } from '../../../core/models/mutable.book-history';
import { addBookHistory, updateBookHistory } from '../../../core/store/actions/book-history.actions';

@Component({
  selector: 'book-history-edit-widget',
  templateUrl: './book-history-edit.component.html',
})
export class BookHistoryEditComponent implements OnInit, OnDestroy {

  private _service: BookService;
  private _bookHistoryService: BookHistoryService;
  public Books: List<Book>;
  public BookHistory: BookHistory;
  private _subscription: any;
  public MutableBookHistory: MutableBookHistory = new MutableBookHistory();
  public isUpdate: boolean = false;
  constructor(service: BookService, private store: AppStore, bookHistoryService: BookHistoryService) {

    this._subscription = bookHistoryService.updateSubject.subscribe((bookHistory) => {
      this.MutableBookHistory = new MutableBookHistory();
      this.MutableBookHistory.Id = bookHistory.Id;
      this.MutableBookHistory.BookId = bookHistory.BookId;
      this.MutableBookHistory.DateGiven = bookHistory.DateGiven;
      this.MutableBookHistory.DateReturned = bookHistory.DateReturned;
      this.MutableBookHistory.UserId = bookHistory.UserId;
      this.isUpdate = true;
    });
    this._service = service;
    this._bookHistoryService = bookHistoryService;

    this._service.getAll()
      .subscribe(res => {
        let books = (res.data).map((book: any) =>
          new Book({ Id: book.id, GenreId: book.genreId,  Name: book.name }));

        store.dispatch(loadBooks(List(books)));
        this.Books = store.getState().books;
      }, err => console.log("Error retriving Books"));

    store.subscribe((state: any) => console.log("New state received"));

  }

  ngOnDestroy() {

    this._subscription.unsubscribe();
  }


  onUpdate() {

    this.BookHistory = this.createImmutableBookHistory();

    this._bookHistoryService.updateForItem([this.BookHistory])
      .subscribe(res => {
        let updatedBookHistory = res.json()[0].dto;

        console.log(updatedBookHistory);

        this.store.dispatch(updateBookHistory(new BookHistory(<BookHistory>{
          Id: updatedBookHistory.id, BookId: updatedBookHistory.bookId,
          DateGiven: updatedBookHistory.dateGiven,
          DateReturned: updatedBookHistory.dateReturned,
          UserId: null
        })));
      }, err => { })
  }



  onCancel(form: NgForm) {
    form.reset();
    this.isUpdate = false;
    this.MutableBookHistory = new MutableBookHistory();
  }

  createImmutableBookHistory(): BookHistory {
    return new BookHistory({
      Id: this.MutableBookHistory.Id, BookId: this.MutableBookHistory.BookId,
      DateGiven: this.MutableBookHistory.DateGiven,
      DateReturned: this.MutableBookHistory.DateReturned,
      UserId: null
    });
  }

  onSubmit(form: NgForm) {

    this.BookHistory = this.createImmutableBookHistory();

    this._bookHistoryService.saveItem([this.BookHistory])
      .subscribe(res => {
        let addedBook = res.json()[0].dto;
        this.store.dispatch(addBookHistory(new BookHistory(<BookHistory>{
          Id: addedBook.id, BookId: addedBook.bookId,
          DateReturned: addedBook.dateReturned,
          DateGiven: addedBook.dateReturned,
          UserId: null
        })));
        form.reset();
      }, err => { })
  }

  ngOnInit() {
  }

}
