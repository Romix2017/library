import { Observable } from "rxjs/Observable";

export interface IRepository<T> {

  getAll(): Observable<any>
  saveItem(newItem: T[]): Observable<any>
  updateForItem(updatedItem: T[]): Observable<any>
  deleteItem(deleteItem: T, params: URLSearchParams): Observable<any> 

}
