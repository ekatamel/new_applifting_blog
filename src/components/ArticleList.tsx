import Article from "./Article";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios-instance";
import { ArticleType } from "../types/ArticleInterface";
import { FC } from "react";
import { useQuery } from "react-query";

interface Articles {
  items: ArticleType[];
}

const ArticleList = () => {
  const loadArticles = async () => {
    const response = await axiosInstance.get<Articles>("/articles");
    return response.data;
  };

  const { data, isLoading, error, isSuccess } = useQuery<Articles, Error>(
    "articles",
    loadArticles
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      {data &&
        data.items?.map((article) => {
          return <Article data={article} />;
        })}
    </div>
  );
};

export default ArticleList;
