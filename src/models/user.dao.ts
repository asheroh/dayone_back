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

const checkUserKakaoId = async (
  kakaoId: number,
  nickname: string,
  kakaoEmail: string,
  profileImage: string,
) => {
  const createNewUser = await dayoneDataSource.query(
    `INSERT INTO users (
      id,
      email,
      profile_image,
      nickname
    ) VALUES (?,?,?,?)`,
    [kakaoId, kakaoEmail, profileImage, nickname],
  );
  return createNewUser;
  // const user = await dayoneDataSource.query(
  //   `SELECT
  //   u.id,
  //   u,email,
  //   u.profile_image,
  //   u.nickname
  //   FROM users u`,
  //   [kakaoId, nickname, kakaoEmail, profileImage],
  // );
  // return user;
};

export default { createUser, checkUserKakaoId };
