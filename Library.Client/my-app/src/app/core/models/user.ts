import { List, Record } from 'immutable';

const USERRECORD = Record({
  Id: 0,
  Name: "",
  Email: ""
});

export class User extends USERRECORD {
  Id: number;
  Name: string;
  Email: string;

  constructor(props: any) {
    super(props);
  }
}
