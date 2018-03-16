import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation, Injectable } from '@angular/core';
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
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateNativeAdapter } from '../../../core/extensions/date-picker.extension';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { loadUsers } from '../../../core/store/actions/user.actions';

@Injectable()



@Component({
  selector: 'book-history-edit-widget',
  templateUrl: './book-history-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class BookHistoryEditComponent implements OnInit, OnDestroy {

  private _service: BookService;
  private _bookHistoryService: BookHistoryService;
  public Books: List<Book>;
  public BookHistory: BookHistory;
  private _subscription: any;
  public MutableBookHistory: MutableBookHistory = new MutableBookHistory();
  public isUpdate: boolean = false;
  public LibraryUsers: List<User>;
  private _usersService: UserService;

  constructor(service: BookService, private store: AppStore, bookHistoryService: BookHistoryService, userService: UserService) {

    this._subscription = bookHistoryService.updateSubject.subscribe((bookHistory) => {

      this.MutableBookHistory = new MutableBookHistory();
      this.MutableBookHistory.Id = bookHistory.Id;
      this.MutableBookHistory.BookId = bookHistory.BookId;
      this.MutableBookHistory.DateGiven = bookHistory.DateGiven;

      if (bookHistory.DateReturned == "0001-01-01T00:00:00") {
        //this.MutableBookHistory.DateReturned = "";
      } else {
        this.MutableBookHistory.DateReturned = bookHistory.DateReturned;
      }
    

      this.MutableBookHistory.LibraryUserId = bookHistory.LibraryUserId;
      this.MutableBookHistory.BookName = bookHistory.BookName;
      this.MutableBookHistory.LibraryUserName = bookHistory.LibraryUserName;
      this.isUpdate = true;
    });
    this._service = service;
    this._bookHistoryService = bookHistoryService;
    this._usersService = userService;

  }

  ngOnDestroy() {

    this._subscription.unsubscribe();
  }


  onUpdate() {
    this.BookHistory = this.createImmutableBookHistory();
    this._bookHistoryService.updateForItem([this.BookHistory])
      .subscribe(res => {
        let updatedBookHistory = res[0].dto;

        this.store.dispatch(updateBookHistory(new BookHistory(<BookHistory>{
          Id: updatedBookHistory.id,
          BookId: updatedBookHistory.bookId,
          DateGiven: updatedBookHistory.dateGiven,
          DateReturned: updatedBookHistory.dateReturned,
          BookName: updatedBookHistory.bookName,
          LibraryUserId: updatedBookHistory.libraryUserId,
          LibraryUserName: updatedBookHistory.libraryUserName
        })));
      },
      err => { });
  }



  onCancel(form: NgForm) {
    form.reset();
    this.isUpdate = false;
    this.MutableBookHistory = new MutableBookHistory();
  }

  createImmutableBookHistory(): BookHistory {

  

    return new BookHistory({
      Id: this.MutableBookHistory.Id,
      BookId: this.MutableBookHistory.BookId,
      DateGiven: this.MutableBookHistory.DateGiven,
      DateReturned: this.MutableBookHistory.DateReturned == null ? "0001-01-01T00:00:00" : this.MutableBookHistory.DateReturned,
      LibraryUserId: this.MutableBookHistory.LibraryUserId,
      BookName: this.MutableBookHistory.BookName,
      LibraryUserName: this.MutableBookHistory.LibraryUserName
    });
  }

  onSubmit(form: NgForm) {

    this.BookHistory = this.createImmutableBookHistory();
    this._bookHistoryService.saveItem([this.BookHistory])
      .subscribe(res => {
        let addedBook = res[0].dto;
        this.store.dispatch(addBookHistory(new BookHistory(<BookHistory>{
          Id: addedBook.id, BookId: addedBook.bookId,
          DateReturned: addedBook.dateReturned,
          DateGiven: addedBook.dateGiven,
          LibraryUserId: addedBook.libraryUserId,
          BookName: addedBook.bookName,
          LibraryUserName: addedBook.libraryUserName
        })));
        form.reset();
      }, err => { })
  }

  ngOnInit() {

    this._usersService.getAll()
      .subscribe(res => {
        let users = (res.data).map((user: any) =>
          new User({ Id: user.id, Name: user.name, Email: user.email }));

        this.store.dispatch(loadUsers(List(users)));
        this.LibraryUsers = this.store.getState().users;
      }, err => console.log("Error retriving users"));


    this._service.getAll()
      .subscribe(res => {
        let books = (res.data).map((book: any) =>
          new Book({ Id: book.id, GenreId: book.genreId, Name: book.name }));

        this.store.dispatch(loadBooks(List(books)));
        this.Books = this.store.getState().books;
      }, err => console.log("Error retriving Books"));
  }

}
