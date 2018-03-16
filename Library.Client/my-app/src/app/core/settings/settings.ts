import { BookService } from "../services/book.service";
import { BookHistoryService } from "../services/book-history.service";
import { GenreService } from "../services/genre.service";
import { AppStore } from "../store/store";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export const SERVER: string = "http://localhost:50167/"
export const APIBOOKS: string = "api/books";
export const APIGENRES: string = "api/genres";
export const APIBOOKSHISTORY: string = "api/booksHistory";
export const APIUSERS: string = "api/users";

export class Constants {
  static readonly DATE_FMT = 'dd/MMM/yyyy';
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm:ss`;
}


export class Privileges {
  ViewBooks: string = "ViewBooksPrivilege"
  ViewHistoryBooks: string = "ViewHistoryBooksPrivilege"
  ViewGenres: string = "ViewGenres"
  DeleteBooks: string = "DeleteBookPrivilege"
  DeleteGenres: string = "DeleteGenresPrivilege"
  DeleteHistoryBooks: string = "DeleteHistoryBookPrivilege"
}



export const providers: any[] = [
  { provide: 'BookService', useExisting: BookService },
  { provide: 'BookHistoryService', useExisting: BookHistoryService },
  { provide: 'GenreService', useExisting: GenreService },
  { provide: 'AppStore', useExisting: AppStore },
  { provide: 'UserService', useExisting: UserService }
 // { provide: 'AuthService', useClass: AuthService },
]

