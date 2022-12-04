import Article from './Article';
import { ArticleType } from '../types/ArticleInterface';
import { useQuery } from 'react-query';
import { Request } from '../utils/requests';
import { Trans, useTranslation } from 'react-i18next';

interface Articles {
  items: ArticleType[];
}

const ArticleList = () => {
  const { data, isLoading, error } = useQuery<any>('articles', Request.loadArticles);

  const [t, i18n] = useTranslation();

  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language);
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  // if (error) {
  //   return <p>{error.message}</p>;
  // }

  // let sortedArticles: ArticleType[] | null = null;

  // if (data) {
  //   sortedArticles = data.items?.sort((a, b) => {
  //     const dateA = Number(new Date(a.createdAt));
  //     const dateB = Number(new Date(b.createdAt));

  //     return dateB - dateA;
  //   });
  // }

  console.log(data);

  return (
    <div className="w-10/12 mx-auto flex flex-col gap-y-8">
      <button
        onClick={() => {
          changeLanguage('en');
        }}>
        EN
      </button>
      <button
        onClick={() => {
          changeLanguage('ru');
        }}>
        RU
      </button>
      <h1 className="text-4xl text-black mt-16 mb-8">{t('title')}</h1>
      <h2>{t('subtitle')}</h2>
      {/* <Trans i18nKey="title"></Trans> */}
      {/* {sortedArticles &&
        sortedArticles.map((article, i) => {
          return <Article key={i} article={article} />;
        })} */}
    </div>
  );
};

export default ArticleList;
