import { Injectable, Inject } from '@angular/core';
import { Genre } from "../models/genre";
import { List } from 'immutable';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Http, URLSearchParams, Headers, RequestOptionsArgs } from '@angular/http'
import { Repository } from '../repository/repository';
import { APIGENRES } from '../settings/settings';


@Injectable()
export class GenreService extends Repository<Genre> {

  constructor(http: HttpClient) {
    super(http);
    this.API = APIGENRES;
  }

  createUrlParams(item: Genre): HttpParams {
    let params = new HttpParams()
    .append('id', '' + item.Id)
    .append('name', '' + item.Name);
    return params;
  }

}
