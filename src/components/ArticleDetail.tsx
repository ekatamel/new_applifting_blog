import { useParams } from 'react-router-dom';
import { ArticleDetailType } from '../types/ArticleInterface';
import { FC } from 'react';
import CommentList from './CommentList';
import { useQuery } from 'react-query';
import { TenantType } from '../types/TenantInterace';
import Moment from 'react-moment';
import { Request } from '../utils/requests';
import '../styles/article.scss';

const ArticleDetail: FC = () => {
  const { id } = useParams<string>();

  const { data, error, isLoading } = useQuery<ArticleDetailType, Error>('articleDetail', () => {
    return Request.loadArticle(id);
  });

  const { data: tenantData } = useQuery<TenantType>('tenant', Request.loadTenant);

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
              {' '}
              <Moment format="MM/DD/YYYY">{data.createdAt.toString()}</Moment>
            </p>
            <div className="article__image"></div>

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
          />
        )}
      </article>
    </>
  );
};

export default ArticleDetail;
