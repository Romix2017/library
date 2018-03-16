import { Component, Input, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { GenreService } from '../../../core/services/genre.service';
import { BookHistoryService } from '../../../core/services/book-history.service';
import { IRepository } from '../../../core/repository/IRepository';
import { providers } from '../../../core/settings/settings';

@Component({
  selector: 'finder',
  template: require('./finder.component.html'),
  styleUrls: ['./finder.component.css'.toString()],
  //host: { '(input-blur)': 'onInputBlur($event)' },
  providers: [...providers]
})
export class FinderComponent implements OnInit {
  itemCtrl: FormControl;
  filteredItems: Observable<any[]>;
  public items: any[] = [];

  @Input() serviceType: string;

  private _service: any;

  constructor(private injector: Injector) {

  }


  ngOnInit() {
    this._service = this.injector.get(this.serviceType);
    this.itemCtrl = new FormControl();
    this.filteredItems = this.itemCtrl.valueChanges
      .debounceTime(400)
      .do(value => {

        this._service.getAll({ name: value }).subscribe((res: any) => { this.items = res.data;});

      }).delay(500).map(() => this.items);
  }

  onFilterClear(event?: any) {
    this._service.emitItemForFinder();
    this.itemCtrl.setValue("");
  }

  optionClick(event) {
    let emitItemForFinder = this.items[0];
    if (this.items.length > 1) {
      this.items.forEach((item, index) => {
        if (item.name == event.target.innerText) {
          emitItemForFinder = item;
        }
      });
    }
    this._service.emitItemForFinder(emitItemForFinder);
  }

}
