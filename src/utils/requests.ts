import { axiosInstance } from "./axios-instance";
import axios from "axios";
import { ArticleDetailType, ArticleType } from "../types/ArticleInterface";
import { TenantType } from "../types/TenantInterace";
import { CommentPostType } from "../types/CommentInterface";
import { LoginType } from "../types/LoginType";

interface Articles {
  items: ArticleType[];
}

export class Request {
  articleId: string | undefined;
  commentId: string | undefined;
  comment: CommentPostType | undefined;
  loginData: LoginType | undefined;

  constructor(
    articleId?: string | undefined,
    commentId?: string | undefined,
    comment?: CommentPostType | undefined,
    loginData?: LoginType | undefined
  ) {
    this.articleId = articleId;
    this.commentId = commentId;
    this.comment = comment;
    this.loginData = loginData;
  }

  loadArticleComments = async () => {
    const response = await axiosInstance.get<ArticleDetailType>(
      `/articles/${this.articleId}`
    );
    return response.data;
  };

  loadTenant = async () => {
    const response = await axiosInstance.get<TenantType>(
      `/tenants/f82f3833-b927-4104-9efe-042cfe93bb35`
    );
    return response.data;
  };

  loadArticle = async () => {
    const response = await axiosInstance.get<ArticleDetailType>(
      `/articles/${this.articleId}`
    );
    return response.data;
  };

  loadArticles = async () => {
    const response = await axiosInstance.get<Articles>("/articles");
    return response.data;
  };

  upVote = async () => {
    const response = await axiosInstance.post(
      `/comments/${this.commentId}/vote/up`
    );

    return response.data;
  };

  downVote = async () => {
    const response = await axiosInstance.post(
      `/comments/${this.commentId}/vote/down`
    );

    return response.data;
  };

  postComment = async () => {
    const response = await axiosInstance.post("/comments", this.comment);

    return response.data;
  };

  login = async () => {
    try {
      const response = await axios.post(
        "https://fullstack.exercise.applifting.cz/login",
        this.loginData,
        {
          headers: {
            "X-API-KEY": "f877476b-86eb-4fa9-8431-057f8576384c",
          },
        }
      );

      console.log(response);

      return response;
    } catch (error: any) {
      return error.message;
    }
  };
}
