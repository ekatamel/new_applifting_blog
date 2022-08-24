import React from 'react';
import { useQuery } from 'react-query';
import { ArticleType } from '../types/ArticleInterface';
import { Request } from '../utils/requests';
import '../styles/relatedarticle.scss';

interface Articles {
  items: ArticleType[];
}

const RelatedArticles = () => {
  const { data, isLoading, error } = useQuery<Articles, Error>('articles', Request.loadArticles);

  return (
    <article className="relatedarticle__container">
      {data &&
        data.items.map((article) => {
          return (
            <section className="relatedarticle__article" key={article.articleId}>
              <h3 className="relatedarticle__title">{article.title}</h3>
              <p className="relatedarticle__perex">{article.perex}</p>
            </section>
          );
        })}
    </article>
  );
};

export default RelatedArticles;
