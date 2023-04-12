import axios from 'axios';
import { Request, Response } from 'express';
import { CustomSession } from '../interfaces/CustomSession';
import { Post } from '../interfaces/post.interface';
import PostService from '../services/post.service';

class PostController {

  private setResponseHeaders(res: Response) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  public createPost = async (req: Request, res: Response) => {
    try {      
      const { bookId, dayCount, passage, comment }:Post = req.body;
      // 공감 카운트는 데이기록 등록시 default value = 0
      const userId: string = req.session.id
      const newPost = await PostService.createPost(userId, bookId, dayCount, passage, comment );
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

    const userPosts = await PostService.getUserPosts(userId);
    res.status(200).json({ message: userPosts });
  };

  // public updatePostById = async (
  //   req: Request,
  //   res: Response,
  // ): Promise<void> => {
  //   const post: Post = req.body;
  //   const updatePost: Post = await this.PostService.updatePostById(post);
  //   res.status(200).json({ message: 'Successfully Update Post' });
  // };

  public deletePostById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const postId: string = req.params.postId;
    await PostService.deletePostById(postId);
    res.status(204).json({ message: 'Successfully delete Post' });
  };

  public getAllPosts = async (req: Request, res: Response) => {
    const allPosts = await PostService.getAllPosts();

    res.status(200).json({ message: '모든 기록 조회 성공', data:allPosts });
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
      res.status(200).json({message: "책 제목 불러오기 성공", data})
    } catch (error) {
      console.error(error);
    }
  };

  public addPostLike = async (req: Request, res: Response) => {
    const { postId } = req.body;
    const userId = (req.session as CustomSession).userId as string
    console.log(userId, "post controller");
    
    await PostService.addPostLike(userId, postId);
    return res.status(201).json({ message: 'successfully like request' });
  };

  public deletePostLike = async (req: Request, res: Response) => {
    const { postId } = req.params;

    const accessToken = req.headers.cookie?.split('=')[1];

    await PostService.deletePostLike(postId, accessToken);
    return res.status(204).json({ message: 'Successfully delete like' });
  };
}

export default new PostController();
