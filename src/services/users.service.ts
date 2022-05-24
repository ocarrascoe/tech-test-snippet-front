import {API} from './index';
import {IUser} from "../interfaces";

class UsersService {
  getUsers() {
    return API.get<Array<IUser>>(`users/all`)
  }
}

export default new UsersService();