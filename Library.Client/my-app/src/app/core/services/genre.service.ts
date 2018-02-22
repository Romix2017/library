import { Injectable, Inject } from '@angular/core';
import { Genre } from "../models/genre";
import { List } from 'immutable';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Http, URLSearchParams, Headers, RequestOptionsArgs } from '@angular/http'
import { Repository } from '../repository/repository';
import { APIGENRES } from '../settings/settings';

//const SERVER: string = "http://localhost:50167/"

@Injectable()
export class GenreService extends Repository<Genre> {

  constructor() {
    super();
    this.API = APIGENRES
  }

  createUrlParams(item: Genre): URLSearchParams {
    let params = new URLSearchParams();
    params.append('id', '' + item.Id);
    params.append('name', '' + item.Name);
    return params;
  }

}
