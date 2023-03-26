import dayoneDataSource from './dayone.data-source';

class AuthDao {
  async checkUserInfo(kakaoId: number) {
    const [user] = await dayoneDataSource.query(
      `
      SELECT id
      FROM users u
      WHERE u.id = ?;
      `,
      [kakaoId],
    );
    return user ? user.id : null;
  }

  async insertKakaoUserInfo(
    kakaoId: number,
    nickname: string,
    kakaoEmail: string,
    profileImage: string,
  ) {
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
  }
}

export default new AuthDao();
