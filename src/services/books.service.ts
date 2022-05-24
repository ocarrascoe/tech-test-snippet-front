import {API} from './index';
import {IBook, ICreateBook} from "../interfaces";

class BooksService {
  getBooks() {
    return API.get<Array<IBook>>(`books/all`)
  }
  createBook(book: ICreateBook) {
    return API.post(`books/`, book)
  }
}

export default new BooksService();