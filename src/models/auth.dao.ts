import { all } from 'axios';
import dayoneDataSource from './dayone.data-source';

class AuthDao {
  async checkUserInfo(kakaoId: number) {
    const [user] = await dayoneDataSource.query(
      `
      SELECT *
      FROM users
      WHERE social_id = ?;
      `,
      [kakaoId],
    );

    return user;
  }

  async insertKakaoUserInfo(
    kakaoId: number,
    nickname: string,
    kakaoEmail: string,
    profileImage: string,
  ) {
    const createNewUser = await dayoneDataSource.query(
      `INSERT INTO users (
        social_id,
        email,
        profile_image,
        nickname
      ) VALUES (?,?,?,?)`,
      [kakaoId, kakaoEmail, profileImage, nickname],
    );
    return createNewUser;
  }

  async getAllUser() {
    const allUserInfo = await dayoneDataSource.query(
      `SELECT * 
      FROM users;
      `,
    );
    return allUserInfo;
  }
}

export default new AuthDao();
