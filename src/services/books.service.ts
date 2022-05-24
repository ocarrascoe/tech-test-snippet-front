import {API} from './index';
import {IBook, ICreateBook, IEditBook} from "../interfaces";

class BooksService {
  getBooks() {
    return API.get<Array<IBook>>(`books/all`)
  }

  createBook(book: ICreateBook) {
    return API.post(`books/`, book)
  }

  editBook(id: number, book: IEditBook) {
    console.log('book: ', book);
    return API.patch(`/books/${id}`, book)
  }

  deleteBook(id: number) {
    return API.delete<any>(`/books/${id}`);
  }
}

export default new BooksService();