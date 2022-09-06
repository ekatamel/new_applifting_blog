import { CommentType } from '../types/CommentInterface';

export interface ArticleType {
  articleId: string;
  createdAt: Date;
  imageId: string | null;
  lastUpdatedAt: Date;
  perex: string;
  title: string;
}

export interface ArticleDetailType {
  articleId: string;
  comments: CommentType[];
  content: string;
  createdAt: Date;
  imageId?: string;
  lastUpdatedAt: Date;
  perex: string;
  title: string;
}

export interface NewArticleType {
  title: string;
  perex: string;
  imageId: string;
  content: string;
}

export interface EditArticleType {
  articleId?: string;
  title?: string;
  perex?: string;
  imageId?: string;
  content: string;
}
