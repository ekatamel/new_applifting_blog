export interface CommentType {
  author: string;
  commentId: string;
  content: string;
  createdAt: string;
  score: number;
}

export interface CommentPostType {
  articleId: string;
  author: string | undefined;
  content: string;
}
