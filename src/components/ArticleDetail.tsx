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

  const request = new Request(id);

  const { data, error, isLoading, refetch } = useQuery<ArticleDetailType, Error>(
    'articleDetail',
    request.loadArticle
  );

  const { data: tenantData } = useQuery<TenantType>('tenant', request.loadTenant);

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
            {/* <img src="" alt="" /> */}

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
            onClick={refetch}
          />
        )}
        <button
          onClick={() => {
            refetch();
          }}>
          Refetch
        </button>
      </article>
    </>
  );
};

export default ArticleDetail;
