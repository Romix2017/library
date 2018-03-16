import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user";
import { List } from "immutable";
import { Privileges } from "../../../core/settings/settings";
import { AppStore } from "../../../core/store/store";
import { loadUsers, deleteUser } from "../../../core/store/actions/user.actions";



@Component({
  selector: 'user-widget',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  private _service: UserService;
  public Users: List<User>;
  public Privileges: Privileges = new Privileges();
  private _subscription: any;

  constructor(service: UserService, public store: AppStore) {

    this._service = service;
    this.getAll();

    this._subscription = service.finderSubject.subscribe((item) => {
      this.getAll(item);
    });

  }


  getAll(filter?: any) {

    console.log("user component works");

    this._service.getAll(filter)
      .subscribe(res => {
        let items = (res.data).map((item: any) =>
          new User({ Id: item.id, Name: item.name, Email: item.email }));

        //console.log(items[0]);
        this.store.dispatch(loadUsers(List(items)));
      }, err => console.log("Error retriving Genres"));
  }


  ngOnDestroy() {

    this._subscription.unsubscribe();
  }

  deleteItem(event) {
    event.stopPropagation();
    let itemToDelete: User = this.getItemByEvent(event);
    this._service.deleteItem(itemToDelete, this._service.createUrlParams(itemToDelete)).subscribe(
      res => {
        let removedItem = res.dto;
        this.store.dispatch(deleteUser(new User({ Id: removedItem.id, Name: removedItem.name, Email: removedItem.email })));
      }, err => {
        console.log("Error retriving Books");
      });
  }

  updateItem(event) {

    this._service.emitItemForUpdate(this.getItemByEvent(event));
  }

  getItemByEvent(event: any): User {

    let targetId = event.currentTarget.getAttribute('data-itemid');
    let itemsArray = this.store.getState().users;
    let Items: List<User> = itemsArray.filter((item: User) => item.Id == targetId);
    return Items.get(0);
  }


  ngOnInit() {
  }

}
