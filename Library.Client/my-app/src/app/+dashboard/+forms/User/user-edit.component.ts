import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user";
import { List } from "immutable";
import { MutableUser } from "../../../core/models/mutable.user";
import { AppStore } from "../../../core/store/store";
import { loadUsers, updateUser, addUser } from "../../../core/store/actions/user.actions";
import { NgForm } from "@angular/forms";



@Component({
  selector: 'user-edit-widget',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {

  private _service: UserService;
  public Users: List<User>;
  private _subscription: any;
  public MutableUser: MutableUser = new MutableUser();
  public isUpdate: boolean = false;
  public User: User;

  constructor(service: UserService, private store: AppStore) {
    this._service = service;
    this._subscription = this._service.updateSubject.subscribe((item) => {
      this.MutableUser = new MutableUser();
      this.MutableUser.Id = item.Id;
      this.MutableUser.Name = item.Name;
      this.MutableUser.Email = item.Email;
      this.isUpdate = true;
    });


    //this._service.getAll()
    //  .subscribe(res => {
    //    let users = (res.data).map((user: any) =>
    //      new User({ Id: user.id, Name: user.name, Email: user.Email }));
    //    store.dispatch(loadUsers(List(users)));
    //  }, err => console.log("Error retriving Genres"));

    //store.subscribe((state: any) => console.log("New state received"));

  }

  ngOnDestroy() {

    this._subscription.unsubscribe();
  }


  onUpdate() {

    this.User = this.createImmutableItem();

    this._service.updateForItem([this.User])
      .subscribe(res => {
          let updatedItem = res[0].dto;
          this.store.dispatch(
            updateUser(new User({ Id: updatedItem.id, Name: updatedItem.name, Email: updatedItem.email })));
        },
        err => {});
  }



  onCancel(form: NgForm) {
    form.reset();
    this.isUpdate = false;
    this.MutableUser = new MutableUser();
  }

  createImmutableItem(): User {
    return new User({ Id: this.MutableUser.Id, Name: this.MutableUser.Name, Email: this.MutableUser.Email });
  }

  onSubmit(form: NgForm) {

    this.User = this.createImmutableItem();

    this._service.saveItem([this.User])
      .subscribe(res => {
          let addedItem = res[0].dto;
          this.store.dispatch(addUser(new User({ Id: addedItem.id, Name: addedItem.name, Email: addedItem.email })));
          form.reset();
        },
        err => {});
  }

  ngOnInit() {
  }

}
