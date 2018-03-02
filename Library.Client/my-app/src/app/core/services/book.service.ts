import { Injectable, Inject } from '@angular/core';
import { Book } from "../models/book";
import { List } from 'immutable';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Http, URLSearchParams, Headers, RequestOptionsArgs } from '@angular/http'
import { Subject } from 'rxjs';
import { MutableBook } from '../models/mutable.book';
import { Repository } from '../repository/repository';
import { APIGENRES, APIBOOKS } from '../settings/settings';



@Injectable()
export class BookService extends Repository<Book> {

  constructor(http: HttpClient) {
    super(http);
    this.API = APIBOOKS;
  }

  createUrlParams(item: Book): HttpParams {
    let params = new HttpParams()
      .append('id', '' + item.Id)
      .append('genreid', '' + item.GenreId)
      .append('name', '' + item.Name);
    return params;
  }

}
