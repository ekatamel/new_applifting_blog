import Article from './Article';
import { ArticleType } from '../types/ArticleInterface';
import { useQuery } from 'react-query';
import '../styles/articlelist.scss';
import { Request } from '../utils/requests';

interface Articles {
  items: ArticleType[];
}

const ArticleList = () => {
  const { data, isLoading, error } = useQuery<Articles, Error>('articles', Request.loadArticles);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  let sortedArticles: ArticleType[] | null = null;

  if (data) {
    sortedArticles = data.items?.sort((a, b) => {
      const dateA = Number(new Date(a.createdAt));
      const dateB = Number(new Date(b.createdAt));

      return dateB - dateA;
    });
  }

  return (
    <div className="articles__container">
      <h1>Recent articles</h1>
      {sortedArticles &&
        sortedArticles.map((article, i) => {
          return <Article key={i} article={article} />;
        })}
    </div>
  );
};

export default ArticleList;
