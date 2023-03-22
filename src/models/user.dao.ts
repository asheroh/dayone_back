import dayoneDataSource from './dayone.data-source';
import { User } from '../interfaces/user.interface';

const createUser = async (id: number, email: string): Promise<User> => {
  console.log(id, email);

  const result: Promise<User> = await dayoneDataSource.query(
    `INSERT INTO users(
          id,
          email
      ) VALUES (?, ?);
      `,
    [id, email],
  );
  return result;
};

export default { createUser };
