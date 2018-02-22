import { List, Record } from 'immutable';

const GENRERECORD = Record({
  Id: 0,
  Name: ""
});

export class Genre extends GENRERECORD {
  Id: number;
  Name: string;

  constructor(props: any) {
    super(props);
  }
}
