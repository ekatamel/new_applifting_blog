import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../utils/axios-instance";
import { ArticleDetailType } from "../types/ArticleInterface";
import { FC } from "react";
import CommentList from "./CommentList";

const ArticleDetail = () => {
  const [article, setArticle] = useState<
    ArticleDetailType | null | undefined
  >();

  const { id } = useParams<string>();

  const loadArticle = async () => {
    const response = await axiosInstance.get(`/articles/${id}`);

    console.log(response.data);

    setArticle(response.data);
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <>
      <article>
        {article && (
          <>
            <h1>{article.title}</h1>
            <p>
              <span></span>
              <span></span>
              <span></span>
            </p>
            <img src="" alt="" />
            <p>{article.content}</p>
          </>
        )}
      </article>
      <article>
        {article && <CommentList comments={article.comments} />}
      </article>
    </>
  );
};

export default ArticleDetail;
