import dayoneDataSource from './dayone.data-source';
import { Post } from '../interfaces/post.interface';

const createPost = async (
  user_id: number,
  day_count: number,
  passage: string,
  comment: string,
  sympathy_count: number,
): Promise<Post> => {
  const postResult: Promise<Post> = await dayoneDataSource.query(
    `INSERT INTO posts (
              user_id,
              day_count,
              passage,
              comment,
              sympathy_count
          ) VALUES (?, ?, ?, ?, ?);
          `,
    [user_id, day_count, passage, comment, sympathy_count],
  );
  return postResult;
};

const getUserPosts = async (userId: string): Promise<Post> => {
  const rawQuery = `SELECT * FROM posts
  WHERE user_id = ?;`;
  const getPostsResult: Promise<Post> = await dayoneDataSource.query(rawQuery, [
    userId,
  ]);
  return getPostsResult;
};

export default {
  createPost,
  getUserPosts,
};
