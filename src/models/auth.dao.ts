import { all } from 'axios';
import dayoneDataSource from './dayone.data-source';

class AuthDao {

  public isUser = async (userId:string) => {
    const queryRunner = await dayoneDataSource.createQueryRunner()
    await queryRunner.connect()

    const [user] = await queryRunner.query(`
      SELECT nickname
      FROM users
      WHERE id = ?;`,
      [userId])

      console.log([user],"DAO");
      
    return user
  } 
  public checkUserInfo = async (kakaoId: number) => {
    const [user] = await dayoneDataSource.query(
      `
      SELECT id
      FROM users
      WHERE social_id = ?;
      `,
      [kakaoId],
    );

    return user;
  }

  public insertKakaoUserInfo = async (
    kakaoId: number,
    nickname: string,
    kakaoEmail: string,
    profileImage: string,
  ) => {
    const createNewUser = await dayoneDataSource.query(
      `INSERT INTO users (
        social_id,
        email,
        profile_image,
        nickname
      ) VALUES (?,?,?,?)`,
      [kakaoId, kakaoEmail, profileImage, nickname],
    );

    const getUserPrimaryKey = await dayoneDataSource.query(
      `
      SELECT id
      FROM users u
      WHERE social_id = ?;`,
      [kakaoId],
    );
    return getUserPrimaryKey;
  }

  public getAllUser = async () => {
    const allUserInfo = await dayoneDataSource.query(
      `SELECT * 
      FROM users;
      `,
    );
    return allUserInfo;
  }
}

export default new AuthDao();
