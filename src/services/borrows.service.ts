import {API} from './index';
import {ICreateBorrow, IReturnBook} from "../interfaces";

class BorrowsService {
  createBorrow(borrow: ICreateBorrow) {
    return API.post(`borrows/`, borrow)
  }
  returnBook(borrow: IReturnBook) {
    return API.post(`/borrows/book`, borrow);
  }
}

export default new BorrowsService();