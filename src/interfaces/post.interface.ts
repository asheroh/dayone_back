export interface Post {
  id: number;
  userId: string;
  bookId: string;
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
