import jwt, { JwtPayload } from 'jsonwebtoken';
import { InsertValuesMissingError } from 'typeorm';
import { Post } from '../interfaces/post.interface';
import PostDao  from '../models/post.dao';

class PostService {
  public createPost = async (userId:string, bookId:string, dayCount:number, passage:string, comment:string ): Promise<void> => {
    const newPost = await PostDao.createPost(
      userId,
      bookId,
      dayCount,
      passage,
      comment,
    );
  };

  public getUserPosts = async (userId: string) => {
    const posts = PostDao.getUserPosts(userId);
    return posts;
  };

  // public updatePostById = async (post: Post) => {
  //   const { bookId, dayCount, passage, comment } = post;
  //   const updatePost: Post = await .PostDao.updatePost(
  //     bookId,
  //     dayCount,
  //     passage,
  //     comment,
  //   );
  //   return updatePost;
  // };

  public deletePostById = async (postId: string) => {
    const post = PostDao.deletePostById(postId);
    return post;
  };

  public getAllPosts = async () => {
    return await PostDao.getAllPosts();
  };

  public addPostLike = async (userId: string, postId: string) => {
    if (!userId || !postId) {
      throw new InsertValuesMissingError();
    }
    console.log("post service", userId, postId);
    
    const addPostLike = await PostDao.addPostLike(userId, postId);
    return addPostLike;
  };

  public async deletePostLike(postId: string, accessToken: any) {
    console.log(accessToken, '12312312');

    if (!postId || !accessToken) {
      throw new InsertValuesMissingError();
    }
    const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const { id } = (await jwt.verify(accessToken, SECRET_KEY)) as JwtPayload;

    const deletePostLike = await PostDao.deletePostLike(postId, id);
    return deletePostLike;
  }
}

export default new PostService();
