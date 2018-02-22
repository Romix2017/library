import { List, Record } from 'immutable';

const BOOKRECORD = Record({
  Id: 0,
  GenreId: 0,
  Name: ""
});

export class Book extends BOOKRECORD {

  Id: number;
  GenreId: number;
  Name: string;

  constructor(props: any) {
    super(props);
  }

}
