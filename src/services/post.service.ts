import { Post } from '../interfaces/post.interface';
import postDao from '../models/post.dao';

const createPost = async (
  id: number,
  user_id: number,
  day_count: number,
  passage: string,
  comment: string,
  sympathy_count: number,
): Promise<Post> => {
  const createPost: Post = await postDao.createPost(
    id,
    user_id,
    day_count,
    passage,
    comment,
    sympathy_count,
  );
  return createPost;
};

export default {
  createPost,
};
