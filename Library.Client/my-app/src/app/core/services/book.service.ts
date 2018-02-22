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

const SERVER: string = "http://localhost:50167/"

@Injectable()
export class BookService extends Repository<Book> {

  constructor() {
    super();
    this.API = APIBOOKS;
  }

  createUrlParams(item: Book): URLSearchParams {
    let params = new URLSearchParams();
    params.append('id', '' + item.Id);
    params.append('genreid', '' + item.GenreId);
    params.append('name', '' + item.Name);
    return params;
  }

}
