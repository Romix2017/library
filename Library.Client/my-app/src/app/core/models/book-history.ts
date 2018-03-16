import { List, Record } from 'immutable';

const BOOKHISTORYRECORD = Record({
  Id: 0,
  BookId: 0,
  DateGiven: "",
  DateReturned: "",
  LibraryUserId: 0,
  BookName: "",
  LibraryUserName: ""
});

export class BookHistory extends BOOKHISTORYRECORD {

  Id: number;
  BookId: number;
  DateGiven: string;
  DateReturned: string;
  LibraryUserId: number;
  BookName: string;
  LibraryUserName: string;

  constructor(props: any) {
    super(props);
  }
}
