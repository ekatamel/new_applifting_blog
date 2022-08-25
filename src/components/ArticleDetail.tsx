import { useParams } from 'react-router-dom';
import { ArticleDetailType } from '../types/ArticleInterface';
import { FC } from 'react';
import CommentList from './CommentList';
import { useQuery } from 'react-query';
import { TenantType } from '../types/TenantInterace';
import Moment from 'react-moment';
import { Request } from '../utils/requests';
import '../styles/article.scss';
import MDEditor from '@uiw/react-md-editor';
import RelatedArticles from './RelatedArticles';
import Image from './Image';

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
    <section className="article__container">
      <article className="article__article">
        {data && (
          <div className="article__content">
            <h1>{data.title}</h1>
            <span>{tenantData?.name}</span>
            <p>
              {' '}
              <Moment format="MM/DD/YYYY">{data.createdAt.toString()}</Moment>
            </p>
            {data && <Image imageId={data?.imageId} width="760px" height="504px" />}
            <div className="container" data-color-mode="light">
              <p>{<MDEditor.Markdown source={data.content} />}</p>
            </div>
          </div>
        )}
        <article>
          {data && (
            <CommentList
              comments={data.comments}
              articleId={data.articleId}
              author={tenantData?.name}
            />
          )}
        </article>
      </article>

      <RelatedArticles />
    </section>
  );
};

export default ArticleDetail;
