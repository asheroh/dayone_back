import { QueryRunner } from 'typeorm';
import dayoneDataSource from './dayone.data-source';
import { Post } from '../interfaces/post.interface';

class PostDao {
  public createPost = async (
    userId: string,
    bookId: string,
    dayCount: number,
    passage: string,
    comment: string,
  ): Promise<void> => {

    const queryRunner = await dayoneDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  
    try {
      const postResult: Promise<void> = await queryRunner.query(
        `INSERT INTO posts (
            user_id,
            book_id,
            day_count,
            passage,
            comment,
            sympathy_count
        ) VALUES (?, ?, ?, ?, ?, 0);
        `,
        [userId, bookId, dayCount, passage, comment],
      );
  
      const addDayCount: Promise<void> = await queryRunner.query(
        `UPDATE users
          SET day_count = day_count + 1
          WHERE id = ?;
        `,
        [userId],
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error("Error occurred while executing queries: ", error);
      await queryRunner.rollbackTransaction()
    }
  }

  // public updatePost = async();

  public deletePostById = async (postId: string): Promise<Post> => {
    const rawQuery = `DELETE FROM posts WHERE id = ?`;
    return await dayoneDataSource.query(rawQuery, [postId]);
  };

  public getUserPosts = async (userId: string):Promise<void> => {
    const queryRunner = await dayoneDataSource.createQueryRunner()
    await queryRunner.query(
      `
      SELECT * 
      FROM posts
      WHERE user_id = ?;
      `,
    [userId])
  }

  public getAllPosts = async (): Promise<Post[]> => {
    const getAllPostRawQuery = `SELECT * FROM posts`;
    const getAllPostsResult: Promise<Post[]> = await dayoneDataSource.query(
      getAllPostRawQuery,
    );
    return getAllPostsResult;
  };

  public addPostLike = async (
    userId: string,
    postId: string,
  ): Promise<void> => {
    const queryRunner = await dayoneDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {

        await queryRunner.query(
          `
        INSERT INTO likes (
          user_id,
          post_id
        ) VALUES (?, ?);
        `,
          [userId, postId],
        );

        // sympathy_count를 1 증가
        await queryRunner.query(
          'UPDATE posts SET sympathy_count = sympathy_count + 1 WHERE id =?',
          [postId],
        );
        await queryRunner.commitTransaction();
    } catch (error) {
      console.error("Error occurred while executing queries: ", error);
      await queryRunner.rollbackTransaction()
    }
  };

  public deletePostLike = async (postId: string, id: string): Promise<void> => {
    await dayoneDataSource.query(
      `
      DELETE FROM likes
      WHERE post_id = ?
        AND user_id = ?
      ;`,
      [postId, id],
    );
  };
}

export default new PostDao();
