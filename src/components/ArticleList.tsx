import Article from "./Article";
import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios-instance";
import { ArticleType } from "../types/ArticleInterface";

function ArticleList() {
  const [articles, setArticles] = useState<ArticleType[] | null | undefined>();
  //   const [articles, setArticles] = useState(null);

  const loadArticles = async () => {
    // const response = await axiosInstance.get<Articles>("/articles");
    const response = await axiosInstance.get("/articles");
    console.log(response.data.items);
    setArticles(response.data.items);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <section>
      {articles &&
        articles.map((article) => {
          return <Article data={article} />;
        })}
    </section>
  );
}

export default ArticleList;
