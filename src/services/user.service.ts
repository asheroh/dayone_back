import userDao from '../models/user.dao';
import { User } from '../interfaces/user.interface';

const signup = async (id: number, email: string): Promise<User> => {
  const newUser: User = await userDao.createUser(id, email);
  return newUser;
};

export default { signup };
