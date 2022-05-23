import {API} from './index';
import {IBook} from "../interfaces";

class BooksService {
  getBooks() {
    return API.get<Array<IBook>>(`books/all`)
  }
}

export default new BooksService();