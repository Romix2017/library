import { List, Record } from 'immutable';

const BOOKHISTORYRECORD = Record({
  Id: 0,
  BookId: 0,
  DateGiven: "",
  DateReturned: "",
  UserId: 0
});

export class BookHistory extends BOOKHISTORYRECORD {

  Id: number;
  BookId: number;
  DateGiven: string;
  DateReturned: string;
  UserId: number;

  constructor(props: any) {
    super(props);
  }
}
