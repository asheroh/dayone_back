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
    `INSERT INTO posts (
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

const getUserPosts = async (userId: string): Promise<void> => {
  const getPostsResult: Promise<void> = await dayoneDataSource.query(
    `SELECT * FROM posts
    WHERE user_id = ?;
      `,
    [userId],
  );
  return getPostsResult;
};

export default {
  createPost,
  getUserPosts,
};
