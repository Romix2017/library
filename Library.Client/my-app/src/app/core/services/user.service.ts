import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Repository } from "../repository/repository";
import { APIUSERS } from "../settings/settings";

@Injectable()
export class UserService extends Repository<User> {

  constructor(http: HttpClient) {
    super(http);
    this.API = APIUSERS;
  }

  createUrlParams(item: User): HttpParams {
    let params = new HttpParams()
      .append('id', '' + item.Id)
      .append('name', '' + item.Name);
    return params;
  }

}
