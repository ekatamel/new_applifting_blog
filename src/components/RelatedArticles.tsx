import React from 'react';
import { useQuery } from 'react-query';
import { ArticleType } from '../types/ArticleInterface';
import { Request } from '../utils/requests';

interface Articles {
  items: ArticleType[];
}

const RelatedArticles = () => {
  const { data, isLoading } = useQuery<Articles, Error>('articles', Request.loadArticles);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <article className="w-3/12">
      <h2 className="text-2xl mt-16 mb-8 font-bold">Related articles</h2>
      {data &&
        data.items.map((article) => {
          return (
            <section key={article.articleId}>
              <h3 className="text-1xl font-bold">{article.title}</h3>
              <p className="mt-2 mb-4">{article.perex}</p>
            </section>
          );
        })}
    </article>
  );
};

export default RelatedArticles;
