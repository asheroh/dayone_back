import axios from 'axios';
import { Request, Response } from 'express';
import { Post } from '../interfaces/post.interface';
import postService from '../services/post.service';

const dayPosting = async (req: Request, res: Response) => {
  try {
    const { user_id, book_id, day_count, passage, comment, sympathy_count } =
      req.body as Post;

    // if (
    //   !user_id ||
    //   !book_id ||
    //   !day_count ||
    //   !passage ||
    //   !comment ||
    //   !sympathy_count
    // ) {
    //   console.log('123');
    //   return res.status(409).json({ message: 'KEY_ERROR' });
    // }

    const createPost: Post = await postService.createPost(
      user_id,
      book_id,
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
  const bookQueryObject = req.query;
  const queryArrays = Object.entries(bookQueryObject).map(([key, value]) => [
    key,
    String(value),
  ]);
  const queryParams = new URLSearchParams(queryArrays).toString();

  const _redirect = 'https://openapi.naver.com/v1/search/book.json?';
  const fullQuery = _redirect + queryParams;

  try {
    const response = await axios.get(fullQuery, {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
    });
    const data = response.data.items;
    console.log(data);

    res.send(data);
  } catch (error) {
    console.error(error);
  }
};

export default {
  dayPosting,
  getUserPosts,
  getAllPosts,
  getBookTitle,
};
