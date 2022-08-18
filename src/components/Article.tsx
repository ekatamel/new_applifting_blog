import { ArticleType } from "../types/ArticleInterface";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios-instance";
import { useQuery } from "react-query";
import { ArticleDetailType } from "../types/ArticleInterface";
import { TenantType } from "../types/TypeInterace";
import Moment from "react-moment";

import { FC } from "react";

interface ArticleProps {
  article: ArticleType;
}

const Article: FC<ArticleProps> = ({ article }) => {
  // const [imageURL, setImageURL] = useState<string>();

  // const loadImage = async () => {
  //   const response = await axiosInstance.get(`images/${data.imageId}`);

  //   setImageURL(response.data);
  // };

  // useEffect(() => {
  //   loadImage();
  // }, []);

  // Load article comments

  const loadArticleComments = async () => {
    const response = await axiosInstance.get<ArticleDetailType>(
      `/articles/${article.articleId}`
    );
    return response.data;
  };

  const {
    data: articleData,
    error,
    isSuccess,
  } = useQuery<ArticleDetailType, Error>(
    `article${article.articleId}`,
    loadArticleComments
  );

  // Load tenant name
  const loadTenant = async () => {
    const response = await axiosInstance.get<TenantType>(
      `/tenants/f82f3833-b927-4104-9efe-042cfe93bb35`
    );
    return response.data;
  };

  const { data: tenantData } = useQuery<TenantType>("tenant", loadTenant);

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
        <span></span>
        <div>
          <span></span>
          <span></span>
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
