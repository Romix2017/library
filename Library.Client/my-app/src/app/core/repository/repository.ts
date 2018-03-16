import { IRepository } from "./IRepository";
import { Observable } from "rxjs/Observable";
import { Injectable, ReflectiveInjector } from "@angular/core";
import { SERVER} from "../settings/settings";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Subject } from "rxjs";
@Injectable()
export class Repository<T> implements IRepository<T> {

  public API: string = "";

  private _http: HttpClient;

  updateSubject: Subject<any> = new Subject<any>();
  finderSubject: Subject<any> = new Subject<any>();


  emitItemForFinder(item?: any) {
    this.finderSubject.next(item);
  }


  emitItemForUpdate(item: any) {
    this.updateSubject.next(item);
  }

  constructor(http: HttpClient) {
    this._http = http;
  }

  getAll(params?: any): Observable<any> {
    return this._http.get(SERVER + this.API, { params: params });
  }
  saveItem(newItem: T[]): Observable<any> {
    return this._http.post(SERVER + this.API, newItem);
  }
  updateForItem(updatedItem: T[]): Observable<any> {
    return this._http.post(SERVER + this.API, updatedItem);
  }

  deleteItem(deleteItem: T, params: HttpParams): Observable<any> {
    return this._http.delete(SERVER + this.API, { params: params });
  }

}
