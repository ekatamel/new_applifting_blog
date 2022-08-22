import { axiosInstance } from './axios-instance';
import axios from 'axios';
import { ArticleDetailType, ArticleType } from '../types/ArticleInterface';
import { TenantType } from '../types/TenantInterace';
import { CommentPostType } from '../types/CommentInterface';
import { LoginType } from '../types/LoginType';

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
    try {
      const response = await axios.post(
        'https://fullstack.exercise.applifting.cz/login',
        loginData,
        {
          headers: {
            'X-API-KEY': 'f877476b-86eb-4fa9-8431-057f8576384c'
          }
        }
      );

      console.log(response);

      return response;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  };
}
