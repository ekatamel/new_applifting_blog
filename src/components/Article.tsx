import { ArticleType, ArticleDetailType } from '../types/ArticleInterface';
import { useQuery } from 'react-query';
import { TenantType } from '../types/TenantInterace';
import Moment from 'react-moment';
import { Request } from '../utils/requests';
import Image from './Image';
import styles from '../styles/Module.module.scss';

import { FC } from 'react';

interface ArticleProps {
  article: ArticleType;
}

const Article: FC<ArticleProps> = ({ article }) => {
  // Load article comments

  const { data: articleData } = useQuery<ArticleDetailType, Error>(
    `article${article.articleId}`,
    () => {
      return Request.loadArticleComments(article.articleId);
    }
  );

  const { data: tenantData } = useQuery<TenantType>('tenant', Request.loadTenant);

  return (
    <div className="flex gap-7">
      <div>{articleData && <Image imageId={articleData.imageId} className={styles.image} />}</div>
      <div className="w-4/12 flex flex-col justify-around">
        <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
        <div className="flex gap-4">
          <span className="text-gray-500">{tenantData?.name}</span>
          <Moment className="text-gray-500" format="MM/DD/YYYY">
            {article.createdAt.toString()}
          </Moment>
        </div>

        <p className="text-xl">{article.perex}</p>
        <div className="flex gap-4">
          <a className="text-blue-500" href={`/articles/${article.articleId}`}>
            Read whole article
          </a>
          <span className="text-gray-500">{articleData?.comments.length} comments</span>
        </div>
      </div>
    </div>
  );
};

export default Article;
