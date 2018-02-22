import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { AppStore } from '../../../core/store/store'
import { List } from 'immutable';
import { loadBooks, deleteBook } from '../../../core/store/actions/book.actions';
import { GenreService } from '../../../core/services/genre.service';
import { Genre } from '../../../core/models/genre';
import { loadGenres, deleteGenre } from '../../../core/store/actions/genre.actions';

@Component({
  selector: 'genre-widget',
  templateUrl: './genre.component.html',
})
export class GenreComponent implements OnInit {

  private _service: GenreService;
  public Genres: List<Genre>;

  constructor(service: GenreService, public store: AppStore) {

    this._service = service;
    this._service.getAll()
      .subscribe(res => {
        let items = (res.data).map((item: any) =>
          new Genre({ Id: item.id,  Name: item.name }));
        store.dispatch(loadGenres(List(items)));
      }, err => console.log("Error retriving Genres"));

    //store.subscribe((state: any) => console.log("New state received"));

  }

  deleteItem(event) {
    event.stopPropagation();
    let itemToDelete: Genre = this.getItemByEvent(event);
    this._service.deleteItem(itemToDelete, this._service.createUrlParams(itemToDelete)).subscribe(
      res => {
        let removedItem = res.json().dto;
        this.store.dispatch(deleteGenre(new Genre({ Id: removedItem.id, Name: removedItem.name })));
      }, err => {
        console.log("Error retriving Books");
      });
  }

  updateItem(event) {

    this._service.emitItemForUpdate(this.getItemByEvent(event));
  }

  getItemByEvent(event: any): Genre {

    let targetId = event.currentTarget.getAttribute('data-itemid');
    let itemsArray = this.store.getState().genres;
    let Items: List<Genre> = itemsArray.filter((item: Genre) => item.Id == targetId);
    return Items.get(0);
  }


  ngOnInit() {
  }

}
