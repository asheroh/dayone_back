import { Request, Response } from 'express';
import { Post } from '../interfaces/post.interface';
// import postService from '../services/post.service';

const dayPosting = async (req: Request, res: Response) => {
  const { id, user_id, day_count, passage, comment, sympathy_count } =
    req.body as Post;

  const createPost = await postService.createPost(
    id,
    user_id,
    day_count,
    passage,
    comment,
    sympathy_count,
  );
};

export default {
  dayPosting,
  create,
};
