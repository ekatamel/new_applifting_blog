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
      `/tenants/9f422521-4f2e-4cd9-bd25-6cc796f9d4bf`
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
          'X-API-KEY': '2280ed69-0200-4cbd-8cb1-aa7bfa735644',
          Authorization: '72cb065e-68c3-44ee-820a-4716d27abb25',
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

  static syncToggle = async (userId: string) => {
    const response = await axiosInstance.put(`/admin/users/${userId}/sync`);
    return response;
  };
}
