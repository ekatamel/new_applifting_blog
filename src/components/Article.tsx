import { ArticleType, ArticleDetailType } from "../types/ArticleInterface";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios-instance";
import { useQuery } from "react-query";
import { TenantType } from "../types/TenantInterace";
import Moment from "react-moment";
import { Request } from "../utils/requests";

import { FC } from "react";

interface ArticleProps {
  article: ArticleType;
}

const Article: FC<ArticleProps> = ({ article }) => {
  // Load article comments

  const request = new Request(article.articleId);

  const {
    data: articleData,
    error,
    isSuccess,
  } = useQuery<ArticleDetailType, Error>(
    `article${article.articleId}`,
    request.loadArticleComments
  );

  const { data: tenantData } = useQuery<TenantType>(
    "tenant",
    request.loadTenant
  );

  if (isSuccess) {
    console.log(articleData);
  }

  return (
    <div className="articles__box">
      <div className="articles__image"></div>
      {/* {imageURL && <img src={URL.createObjectURL(imageURL)} alt="" />} */}
      <div className="articles__content">
        <h2>{article.title}</h2>
        <span>{tenantData?.name}</span>
        <div>
          <Moment format="MM/DD/YYYY">{article.createdAt.toString()}</Moment>
        </div>
        <p>{article.perex}</p>
        <a href={`/articles/${article.articleId}`}>Read whole article</a>
        <span className="articles__comments">
          {articleData?.comments.length} comments
        </span>
      </div>
    </div>
  );
};

export default Article;
