import dayoneDataSource from './dayone.data-source';
import { Post } from '../interfaces/post.interface';

class PostDao {
  public createPost = async (
    userId: number,
    bookId: number,
    dayCount: number,
    passage: string,
    comment: string,
    sympathyCount: number,
  ): Promise<Post> => {
    const postResult: Promise<Post> = await dayoneDataSource.query(
      `INSERT INTO posts (
                user_id,
                book_id,
                day_count,
                passage,
                comment,
                sympathy_count
            ) VALUES (?, ?, ?, ?, ?, ?);
            `,
      [userId, bookId, dayCount, passage, comment, sympathyCount],
    );
    return postResult;
  };

  public getUserPosts = async (userId: string): Promise<Post[]> => {
    const rawQuery = `SELECT * FROM posts WHERE user_id = ?;`;
    const getPostsResult: Promise<Post[]> = await dayoneDataSource.query(
      rawQuery,
      [userId],
    );
    return getPostsResult;
  };
  /**
   * 여기서 중요한 건, 자신의 기록, 그러니까 userID를 받고 기록을 조회한 다음
   * 자신이 작성한 기록들을 받아서 그 중에서 셀렉해서 수정해야한다.
   */
  // public updatePost = async();

  public deletePostById = async (postId: string): Promise<Post> => {
    const rawQuery = `DELETE FROM posts WHERE id = ?`;
    return await dayoneDataSource.query(rawQuery, [postId]);
  };

  public getAllPosts = async (): Promise<Post[]> => {
    const getAllPostRawQuery = `SELECT * FROM posts`;
    const getAllPostsResult: Promise<Post[]> = await dayoneDataSource.query(
      getAllPostRawQuery,
    );
    return getAllPostsResult;
  };
}

export { PostDao };
