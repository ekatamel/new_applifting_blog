import { ArticleType, ArticleDetailType } from '../types/ArticleInterface';
import { useQuery } from 'react-query';
import { TenantType } from '../types/TenantInterace';
import Moment from 'react-moment';
import { Request } from '../utils/requests';

import { FC } from 'react';

interface ArticleProps {
  article: ArticleType;
}

const Article: FC<ArticleProps> = ({ article }) => {
  // Load article comments

  const loadComments = () => {
    return Request.loadArticleComments(article.articleId);
  };

  const { data: articleData } = useQuery<ArticleDetailType, Error>(
    `article${article.articleId}`,
    loadComments
  );

  const { data: tenantData } = useQuery<TenantType>('tenant', Request.loadTenant);

  return (
    <div className="articles__box">
      <div className="articles__image"></div>
      {/* {imageURL && <img src={URL.createObjectURL(imageURL)} alt="" />} */}
      <div className="articles__content">
        <h2>{article.title}</h2>
        <span>{tenantData?.name}</span>
        <div>
          <Moment format="MM/DD/YYYY">{article.createdAt.toString()}</Moment>
        </div>
        <p>{article.perex}</p>
        <a href={`/articles/${article.articleId}`}>Read whole article</a>
        <span className="articles__comments">{articleData?.comments.length} comments</span>
      </div>
    </div>
  );
};

export default Article;
