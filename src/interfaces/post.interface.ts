export interface Post {
  id: number;
  userId: number;
  bookId: number;
  dayCount: number;
  passage: string;
  comment: string;
  sympathyCount: number;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
  type: string;
}
