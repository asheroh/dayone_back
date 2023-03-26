import dayoneDataSource from './dayone.data-source';

// TODO: 카카오 아이디 먼저 받아서 DB에 유저 있는지 없는지 확인

const checkUserInfo = async (kakaoId: number) => {
  const [user] = await dayoneDataSource.query(
    `
    SELECT id
    FROM users u
    WHERE u.id = ?;
    `,
    [kakaoId],
  );
  return user ? user.id : null;
};

const insertKakaoUserInfo = async (
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
};

export default { insertKakaoUserInfo, checkUserInfo };
