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


@Injectable()
export class BookHistoryService extends Repository<BookHistory> {

  constructor(http: HttpClient) {
    super(http);
    this.API = APIBOOKSHISTORY;
  }

  createUrlParams(item: BookHistory): HttpParams {
    let params = new HttpParams()
      .append('id', '' + item.Id)
      .append('bookid', '' + item.BookId)
      .append('dategiven', '' + item.DateGiven)
      .append('datereturned', '' + item.DateReturned)
      .append('libraryuserid', '' + item.LibraryUserId);
    return params;
  }

}
