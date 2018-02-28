import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { AppStore } from '../../../core/store/store'
import { List } from 'immutable';
import { GenreService } from '../../../core/services/genre.service';
import { Genre } from '../../../core/models/genre';
import { loadGenres, addGenre, updateGenre } from '../../../core/store/actions/genre.actions';
import { MutableGenre } from '../../../core/models/mutable.genre';
import { addBook, updateBook } from '../../../core/store/actions/book.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'genre-edit-widget',
  templateUrl: './genre-edit.component.html',
})
export class GenreEditComponent implements OnInit, OnDestroy {

  private _service: GenreService;
  public Genres: List<Genre>;
  private _subscription: any;
  public MutableGenre: MutableGenre = new MutableGenre();
  public isUpdate: boolean = false;
  public Genre: Genre;

  constructor(service: GenreService, private store: AppStore) {
    this._service = service;
    this._subscription = this._service.updateSubject.subscribe((item) => {
      this.MutableGenre = new MutableGenre();
      this.MutableGenre.Id = item.Id;
      this.MutableGenre.Name = item.Name;
      this.isUpdate = true;
    });
  

    this._service.getAll()
      .subscribe(res => {
        let genres = (res.data).map((genre: any) =>
          new Genre({ Id: genre.id, Name: genre.name }));
        store.dispatch(loadGenres(List(genres)));
      }, err => console.log("Error retriving Genres"));

    store.subscribe((state: any) => console.log("New state received"));

  }

  ngOnDestroy() {

    this._subscription.unsubscribe();
  }


  onUpdate() {

    this.Genre = this.createImmutableItem();

    this._service.updateForItem([this.Genre])
      .subscribe(res => {
        let updatedItem = res.json()[0].dto;
        this.store.dispatch(updateGenre(new Genre({ Id: updatedItem.id, GenreId: updatedItem.genreId, Name: updatedItem.name })));
      }, err => { })
  }



  onCancel(form: NgForm) {
    form.reset();
    this.isUpdate = false;
    this.MutableGenre = new MutableGenre();
  }

  createImmutableItem(): Genre {
    return new Genre({ Id: this.MutableGenre.Id, Name: this.MutableGenre.Name });
  }

  onSubmit(form: NgForm) {

    this.Genre = this.createImmutableItem();

    this._service.saveItem([this.Genre])
      .subscribe(res => {
        let addedItem = res.json()[0].dto;
        this.store.dispatch(addGenre(new Genre({ Id: addedItem.id, Name: addedItem.name })));
        form.reset();
      }, err => { })
  }

  ngOnInit() {
  }

}
