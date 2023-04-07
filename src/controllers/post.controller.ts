import axios from 'axios';
import { Request, Response } from 'express';
import { Post } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';

class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  private setResponseHeaders(res: Response) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  public createPost = async (req: Request, res: Response) => {
    try {
      const post: Post = req.body;

      const newPost: Post = await this.postService.createPost(post);
      this.setResponseHeaders(res);
      res
        .status(201)
        .json({ message: 'Created Successfully Post', Post: newPost });
    } catch (err: any) {
      this.setResponseHeaders(res);
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };

  public getUserPosts = async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.params.userId;

    const userPosts = await this.postService.getUserPosts(userId);
    this.setResponseHeaders(res);
    res.status(200).json({ message: userPosts });
  };

  // public updatePostById = async (
  //   req: Request,
  //   res: Response,
  // ): Promise<void> => {
  //   const post: Post = req.body;
  //   const updatePost: Post = await this.postService.updatePostById(post);
  //   res.status(200).json({ message: 'Successfully Update Post' });
  // };

  public deletePostById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const postId: string = req.params.postId;
    await this.postService.deletePostById(postId);
    res.status(204).json({ message: 'Successfully delete Post' });
  };

  public getAllPosts = async (req: Request, res: Response) => {
    const allPosts = await this.postService.getAllPosts();
    this.setResponseHeaders(res);
    res.status(200).json(allPosts);
  };

  public getBookTitle = async (req: Request, res: Response) => {
    const bookQueryObject = req.query;
    const queryArrays = Object.entries(bookQueryObject).map(([key, value]) => [
      key,
      String(value),
    ]);
    const _reqBookQuery = new URLSearchParams(queryArrays).toString();
    const _redirect = 'https://openapi.naver.com/v1/search/book.json?';
    const _reqQuery = _redirect + _reqBookQuery;

    try {
      const response = await axios.get(_reqQuery, {
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
      });
      const data = response.data.items;
      res.send(data);
    } catch (error) {
      console.error(error);
    }
  };

  public addPostLike = async (req: Request, res: Response) => {
    const { userId, postId, type } = req.body;
    await this.postService.addPostLike(userId, postId, type);
    return res.status(201).json({ message: 'successfully like request' });
  };
}

export default new PostController();
