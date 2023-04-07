import { InsertValuesMissingError } from 'typeorm';
import { Post } from '../interfaces/post.interface';
import { PostDao } from '../models/post.dao';

class PostService {
  private postDao: PostDao;

  constructor() {
    this.postDao = new PostDao();
  }

  public createPost = async (post: Post): Promise<Post> => {
    const { userId, bookId, dayCount, passage, comment, sympathyCount } = post;
    const newPost: Post = await this.postDao.createPost(
      userId,
      bookId,
      dayCount,
      passage,
      comment,
      sympathyCount,
    );
    return newPost;
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

  public addPostLike = async (userId: number, postId: number, type: string) => {
    if (!userId || !postId) {
      throw new InsertValuesMissingError();
    }
    const addPostLike = await this.postDao.addPostLike(userId, postId, type);
    return addPostLike;
  };
}

export { PostService };
