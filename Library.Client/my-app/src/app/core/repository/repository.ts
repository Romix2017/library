import { IRepository } from "./IRepository";
import { Observable } from "rxjs/Observable";
import { Injectable, ReflectiveInjector } from "@angular/core";
import { SERVER} from "../settings/settings";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BrowserXhr, Http, URLSearchParams, Headers, RequestOptionsArgs, RequestOptions, BaseRequestOptions, ResponseOptions, BaseResponseOptions, XHRBackend, ConnectionBackend, XSRFStrategy, CookieXSRFStrategy } from '@angular/http'
import { httpFactory, _createDefaultCookieXSRFStrategy } from "@angular/http/src/http_module";
import { Subject } from "rxjs";

class MyCookieXSRFStrategy extends CookieXSRFStrategy { }

@Injectable()
export class Repository<T> implements IRepository<T> {

  public API: string = "";

  protected http: Http;

  updateSubject: Subject<any> = new Subject<any>();

  emitItemForUpdate(item: any) {
    this.updateSubject.next(item);
  }

  constructor() {
    let injector = ReflectiveInjector.resolveAndCreate([
      Http,
      BrowserXhr,
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ResponseOptions, useClass: BaseResponseOptions },
      { provide: ConnectionBackend, useClass: XHRBackend },
      { provide: XSRFStrategy, useFactory: () => new CookieXSRFStrategy() },
    ]);
    this.http = injector.get(Http);
  }

  getAll(): Observable<any> {
    return this.http.get(SERVER + this.API).map(res => res.json());
  }
  saveItem(newItem: T[]): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(SERVER + this.API, JSON.stringify(newItem), { headers: headers });
  }
  updateForItem(updatedItem: T[]): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(SERVER + this.API, JSON.stringify(updatedItem), { headers: headers });
  }

  deleteItem(deleteItem: T, params: URLSearchParams): Observable<any> {
    return this.http.delete(SERVER + this.API, { params: params });
  }

}
