import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { AppStore } from '../../../core/store/store'
import { List } from 'immutable';
import { GenreService } from '../../../core/services/genre.service';
import { Genre } from '../../../core/models/genre';
import { loadGenres } from '../../../core/store/actions/genre.actions';
import { MutableBook } from '../../../core/models/mutable.book';
import { addBook, updateBook } from '../../../core/store/actions/book.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'book-edit-widget',
  templateUrl: './book-edit.component.html',
 // styles: [require('./book-edit.component.css').toString()],
 
})
export class BookEditComponent implements OnInit, OnDestroy {

  private _service: GenreService;
  private _bookService: BookService;
  public Genres: List<Genre>;
  public Book: Book;
  private _subscription: any;
  public MutableBook: MutableBook = new MutableBook();
  public isUpdate: boolean = false;
  constructor(service: GenreService, private store: AppStore, bookService: BookService) {

    this._subscription = bookService.updateSubject.subscribe((book) => {
      this.MutableBook = new MutableBook();
      this.MutableBook.Id = book.Id;
      this.MutableBook.GenreId = book.GenreId;
      this.MutableBook.Name = book.Name;
      this.isUpdate = true;
    });
    this._service = service;
    this._bookService = bookService;

    this._service.getAll()
      .subscribe(res => {
        let genres = (res.data).map((genre: any) =>
          new Genre({ Id: genre.id, Name: genre.name }));

        store.dispatch(loadGenres(List(genres)));
        this.Genres = store.getState().genres;
      }, err => console.log("Error retriving Genres"));

    store.subscribe((state: any) => console.log("New state received"));

  }

  ngOnDestroy() {

    this._subscription.unsubscribe();
  }


  onUpdate() {

    this.Book = this.createImmutableBook();

    this._bookService.updateForItem([this.Book])
      .subscribe(res => {
        let updatedBook = res.json()[0].dto;
        this.store.dispatch(updateBook(new Book({ Id: updatedBook.id, GenreId: updatedBook.genreId, Name: updatedBook.name })));
      }, err => { })
  }



  onCancel(form: NgForm) {
    form.reset();
    this.isUpdate = false;
  }

  createImmutableBook(): Book {
    return new Book({ Id: this.MutableBook.Id, GenreId: this.MutableBook.GenreId, Name: this.MutableBook.Name });
  }

  onSubmit(form: NgForm) {

    this.Book = this.createImmutableBook();

    this._bookService.saveItem([this.Book])
      .subscribe(res => {
        let addedBook = res.json()[0].dto;
        this.store.dispatch(addBook(new Book({ Id: addedBook.id, GenreId: addedBook.genreId, Name: addedBook.name })));
        form.reset();
      }, err => { })
  }

  ngOnInit() {
  }

}
