import axios from 'axios';
import { Request, Response } from 'express';
import { Post } from '../interfaces/post.interface';
import postService from '../services/post.service';

const dayPosting = async (req: Request, res: Response) => {
  try {
    const { user_id, day_count, passage, comment, sympathy_count } =
      req.body as Post;

    if (!user_id || !day_count || !passage || !comment) {
      res.header('Access-Control-Allow-Origin', '*');
      return res.status(409).json({ message: 'KEY_ERROR' });
    }

    const createPost: Post = await postService.createPost(
      user_id,
      day_count,
      passage,
      comment,
      sympathy_count,
    );
    res.header('Access-Control-Allow-Origin', '*');
    res
      .status(201)
      .json({ message: 'Created Successfully Post', Post: createPost });
  } catch (err: any) {
    res.header('Access-Control-Allow-Origin', '*');
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getUserPosts = async (req: Request, res: Response) => {
  const userId: string = req.params.userId;

  const getUserPosts = await postService.getUserPosts(userId);
  res.header('Access-Control-Allow-Origin', '*');
  res.status(200).json({ message: getUserPosts });
};

const getAllPosts = async (req: Request, res: Response) => {
  const getPosts = await postService.getAllPosts();
  res.header('Access-Control-Allow-Origin', '*');
  res.status(200).json(getPosts);
};

const getBookTitle = async (req: Request, res: Response) => {
  console.log(123);
  console.log(req.query);
  const _searchQuery = req.query;
  const _redirect = 'https://openapi.naver.com/v1/search/book.json';
  const fullQuery = _redirect + _searchQuery;

  res.send(fullQuery);
};

export default {
  dayPosting,
  getUserPosts,
  getAllPosts,
  getBookTitle,
};
