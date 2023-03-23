import dayoneDataSource from './dayone.data-source';
import { Post } from '../interfaces/post.interface';

const createPost = async (
  id: number,
  user_id: number,
  day_count: number,
  passage: string,
  comment: string,
  sympathy_count: number,
): Promise<Post> => {
  const postResult: Promise<Post> = await dayoneDataSource.query(
    `INSERT INTO users(
              id,
              user_id,
              day_count,
              passage,
              comment,
              sympathy_count
          ) VALUES (?, ?, ?, ?, ?, ?);
          `,
    [id, user_id, day_count, passage, comment, sympathy_count],
  );
  return postResult;
};

export default {
  createPost,
};
