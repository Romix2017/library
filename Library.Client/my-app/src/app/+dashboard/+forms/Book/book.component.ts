import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { AppStore } from '../../../core/store/store'
import { List } from 'immutable';
import { loadBooks, deleteBook } from '../../../core/store/actions/book.actions';
import { Privileges } from '../../../core/settings/settings'

@Component({
  selector: 'book-widget',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {

  private _service: BookService;
  public Books: List<Book>;
  public BookStore: List<Book>
  public Privileges: Privileges = new Privileges();
  private _subscription: any;


  constructor(service: BookService, public store: AppStore) {

    this._service = service;
    this.getAll();

    this._subscription = service.finderSubject.subscribe((item) => {
      this.getAll(item);
    });



  }


  ngOnDestroy() {

    this._subscription.unsubscribe();
  }

  getAll(filter?: any) {
    this._service.getAll(filter)
      .subscribe(res => {
        let books = (res.data).map((book: any) =>
          new Book({ Id: book.id, GenreId: book.genreId, Name: book.name, GenreName: book.genreName }));
        this.store.dispatch(loadBooks(List(books)));
      }, err => console.log("Error retriving Books"));

  }



  deleteItem(event) {
    event.stopPropagation();
    let bookToDelete: Book = this.getItemByEvent(event);
    this._service.deleteItem(bookToDelete, this._service.createUrlParams(bookToDelete)).subscribe(
      res => {
        let removedBook = res.dto;
        this.store.dispatch(deleteBook(new Book({ Id: removedBook.id, GenreId: removedBook.genreId, Name: removedBook.name })));
      }, err => {
        console.log("Error retriving Books");
      });
  }




  updateItem(event) {
    this._service.emitItemForUpdate(this.getItemByEvent(event));
  }

  getItemByEvent(event: any):Book {

    let targetId = event.currentTarget.getAttribute('data-itemid');
    let books = this.store.getState().books;
    let Items: List<Book> = books.filter((book: Book) => book.Id == targetId);
    return Items.get(0);
  }


  ngOnInit() {
  }

}
