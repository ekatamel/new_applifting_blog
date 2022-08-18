import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../utils/axios-instance";
import { ArticleDetailType } from "../types/ArticleInterface";
import { FC } from "react";
import CommentList from "./CommentList";
import { useQuery } from "react-query";
import { TenantType } from "../types/TypeInterace";
import Moment from "react-moment";
import "../styles/article.scss";

const ArticleDetail = () => {
  const { id } = useParams<string>();

  const loadArticle = async () => {
    const response = await axiosInstance.get<ArticleDetailType>(
      `/articles/${id}`
    );
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery<
    ArticleDetailType,
    Error
  >("articleDetail", loadArticle);

  // Load tenant name
  const loadTenant = async () => {
    const response = await axiosInstance.get<TenantType>(
      `/tenants/f82f3833-b927-4104-9efe-042cfe93bb35`
    );
    console.log(response.data);
    return response.data;
  };

  const { data: tenantData } = useQuery<TenantType>("tenant", loadTenant);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <article>
        {data && (
          <>
            <h1>{data.title}</h1>
            <span>{tenantData?.name}</span>
            <p>
              {" "}
              <Moment format="MM/DD/YYYY">{data.createdAt.toString()}</Moment>
            </p>
            <div className="article__image"></div>
            {/* <img src="" alt="" /> */}

            <p>{data.content}</p>
          </>
        )}
      </article>
      <article>
        {data && (
          <CommentList
            comments={data.comments}
            articleId={data.articleId}
            author={tenantData?.name}
            refetch={refetch}
          />
        )}
        <button
          onClick={() => {
            refetch();
          }}
        >
          Refetch
        </button>
      </article>
    </>
  );
};

export default ArticleDetail;
