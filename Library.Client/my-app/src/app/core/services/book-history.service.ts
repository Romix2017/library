import { Injectable, Inject } from '@angular/core';
import { Book } from "../models/book";
import { List } from 'immutable';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Http, URLSearchParams, Headers, RequestOptionsArgs } from '@angular/http'
import { Subject } from 'rxjs';
import { MutableBook } from '../models/mutable.book';
import { Repository } from '../repository/repository';
import { APIBOOKSHISTORY, APIBOOKS } from '../settings/settings';
import { BookHistory } from '../models/book-history';

const SERVER: string = "http://localhost:50167/"

@Injectable()
export class BookHistoryService extends Repository<BookHistory> {

  constructor() {
    super();
    this.API = APIBOOKSHISTORY;
  }

  createUrlParams(item: BookHistory): URLSearchParams {
    let params = new URLSearchParams();
    params.append('id', '' + item.Id);
    params.append('bookid', '' + item.BookId);
    params.append('dategiven', '' + item.DateGiven);
    params.append('datereturned', '' + item.DateReturned);
    params.append('userid', '' + item.UserId);
    return params;
  }

}
