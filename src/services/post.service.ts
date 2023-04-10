import jwt, { JwtPayload } from 'jsonwebtoken';
import { InsertValuesMissingError } from 'typeorm';
import { Post } from '../interfaces/post.interface';
import { PostDao } from '../models/post.dao';

class PostService {
  private postDao: PostDao;

  constructor() {
    this.postDao = new PostDao();
  }

  public createPost = async (post: Post): Promise<void> => {
    const { userId, bookId, dayCount, passage, comment, sympathyCount } = post;
    const newPost = await this.postDao.createPost(
      userId,
      bookId,
      dayCount,
      passage,
      comment,
      sympathyCount,
    );
  };

  public getUserPosts = async (userId: string) => {
    const posts = this.postDao.getUserPosts(userId);
    return posts;
  };

  // public updatePostById = async (post: Post) => {
  //   const { bookId, dayCount, passage, comment } = post;
  //   const updatePost: Post = await this.postDao.updatePost(
  //     bookId,
  //     dayCount,
  //     passage,
  //     comment,
  //   );
  //   return updatePost;
  // };

  public deletePostById = async (postId: string) => {
    const post = this.postDao.deletePostById(postId);
    return post;
  };

  public getAllPosts = async () => {
    return await this.postDao.getAllPosts();
  };

  public addPostLike = async (userId: number, postId: number) => {
    if (!userId || !postId) {
      throw new InsertValuesMissingError();
    }
    const addPostLike = await this.postDao.addPostLike(userId, postId);
    return addPostLike;
  };

  public async deletePostLike(postId: string, accessToken: any) {
    console.log(accessToken, '12312312');

    if (!postId || !accessToken) {
      throw new InsertValuesMissingError();
    }
    const SECRET_KEY = process.env.JWT_SECRET_KEY as string;
    const { id } = (await jwt.verify(accessToken, SECRET_KEY)) as JwtPayload;

    const deletePostLike = await this.postDao.deletePostLike(postId, id);
    return deletePostLike;
  }
}

export { PostService };
