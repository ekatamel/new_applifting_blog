import { axiosInstance } from './axios-instance';
import {
  ArticleDetailType,
  ArticleType,
  NewArticleType,
  EditArticleType
} from '../types/ArticleInterface';
import { TenantType } from '../types/TenantInterace';
import { CommentPostType } from '../types/CommentInterface';
import { LoginType } from '../types/LoginType';
import axios from 'axios';

interface Articles {
  items: ArticleType[];
}

export class Request {
  static loadArticleComments = async (articleId: string) => {
    const response = await axiosInstance.get<ArticleDetailType>(`/articles/${articleId}`);
    return response.data;
  };

  static loadTenant = async () => {
    const response = await axiosInstance.get<TenantType>(
      `/tenants/f82f3833-b927-4104-9efe-042cfe93bb35`
    );
    return response.data;
  };

  static loadArticle = async (articleId: string | undefined) => {
    const response = await axiosInstance.get<ArticleDetailType>(`/articles/${articleId}`);
    return response.data;
  };

  // Static
  static loadArticles = async () => {
    const response = await axiosInstance.get<Articles>('/articles');
    return response.data;
  };

  static upVote = async (commentId: string) => {
    const response = await axiosInstance.post(`/comments/${commentId}/vote/up`);

    return response.data;
  };

  static downVote = async (commentId: string) => {
    const response = await axiosInstance.post(`/comments/${commentId}/vote/down`);

    return response.data;
  };

  static postComment = async (comment: CommentPostType) => {
    const response = await axiosInstance.post('/comments', comment);

    return response.data;
  };

  static login = async (loginData: LoginType) => {
    const response = await axiosInstance.post('/login', loginData);

    return response.data;
  };

  static postArticle = async (articleData: NewArticleType) => {
    const response = await axiosInstance.post('/articles', articleData);

    return response.data;
  };

  static postImage = async (image: File | null) => {
    const response = await axios.post(
      'https://fullstack.exercise.applifting.cz/images',
      { image: image },
      {
        headers: {
          'X-API-KEY': '5c946f9a-b317-4dd2-a3f3-e188fe5ddb30',
          Authorization: 'e6c7b2c3-30c3-47b3-a831-ce277841cda7',
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  };

  static deleteArticle = async (articleId: string) => {
    const response = await axiosInstance.delete(`/articles/${articleId}`);

    return response;
  };

  static updateArticle = async (articleData: EditArticleType | undefined) => {
    const response = await axiosInstance.patch(`/articles/${articleData?.articleId}`, articleData);

    return response;
  };

  static loadImage = async (imageId: string | undefined) => {
    const response = await axiosInstance.get(`images/${imageId}`, {
      responseType: 'blob'
    });
    return response;
  };
}
