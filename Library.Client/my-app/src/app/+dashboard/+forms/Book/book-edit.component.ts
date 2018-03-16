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
    this._service = service;
    this._bookService = bookService;
  }

  ngOnDestroy() {

    this._subscription.unsubscribe();
  }


  onUpdate() {

    this.Book = this.createImmutableBook();

    this._bookService.updateForItem([this.Book])
      .subscribe(res => {
        let updatedBook = res[0].dto;
        this.store.dispatch(updateBook(new Book({ Id: updatedBook.id, GenreId: updatedBook.genreId, Name: updatedBook.name, GenreName: updatedBook.genreName })));
      }, err => { })
  }



  onCancel(form: NgForm) {
    form.reset();
    this.isUpdate = false;
    this.MutableBook = new MutableBook();
  }

  createImmutableBook(): Book {
    return new Book({ Id: this.MutableBook.Id, GenreId: this.MutableBook.GenreId, Name: this.MutableBook.Name, GenreName: this.MutableBook.GenreName });
  }

  onSubmit(form: NgForm) {

    this.Book = this.createImmutableBook();

    this._bookService.saveItem([this.Book])
      .subscribe(res => {
        let addedBook = res[0].dto;
        this.store.dispatch(addBook(new Book({ Id: addedBook.id, GenreId: addedBook.genreId, Name: addedBook.name, GenreName: addedBook.genreName })));
        form.reset();
      }, err => { })
  }

  ngOnInit() {
    this._subscription = this._bookService.updateSubject.subscribe((book) => {
      this.MutableBook = new MutableBook();
      this.MutableBook.Id = book.Id;
      this.MutableBook.GenreId = book.GenreId;
      this.MutableBook.Name = book.Name;
      this.MutableBook.GenreName = book.GenreName;
      this.isUpdate = true;
    });
   

    this._service.getAll()
      .subscribe(res => {
        let genres = (res.data).map((genre: any) =>
          new Genre({ Id: genre.id, Name: genre.name }));

        this.store.dispatch(loadGenres(List(genres)));
        this.Genres = this.store.getState().genres;
      }, err => console.log("Error retriving Genres"));

  }

}
