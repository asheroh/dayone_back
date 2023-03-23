import { Post } from '../interfaces/post.interface';
import postDao from '../models/post.dao';

const createPost = async (
  user_id: number,
  day_count: number,
  passage: string,
  comment: string,
  sympathy_count: number,
): Promise<Post> => {
  const newPost: Post = await postDao.createPost(
    user_id,
    day_count,
    passage,
    comment,
    sympathy_count,
  );
  return newPost;
};

const getPosts = async (userId: string) => {
  const posts = postDao.getUserPosts(userId);
  return posts;
};

export default {
  createPost,
  getPosts,
};
