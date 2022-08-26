import { useParams } from 'react-router-dom';
import { ArticleDetailType } from '../types/ArticleInterface';
import { FC } from 'react';
import CommentList from './CommentList';
import { useQuery } from 'react-query';
import { TenantType } from '../types/TenantInterace';
import Moment from 'react-moment';
import { Request } from '../utils/requests';
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
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <section className="w-10/12 mx-auto flex justify-between">
      <article className="w-8/12">
        {data && (
          <div className="">
            <h1 className="text-4xl text-black mt-16 mb-8">{data.title}</h1>
            <div className="flex gap-4 mb-6">
              <span className="text-gray-500">{tenantData?.name}</span>
              <Moment className="text-gray-500" format="MM/DD/YYYY">
                {data.createdAt.toString()}
              </Moment>
            </div>

            <div className="h-[504px] w-[890px] mb-8">
              {data && (
                <Image imageId={data?.imageId} className="w-full h-full bg-cover bg-center" />
              )}
            </div>

            <div data-color-mode="light">
              <p>
                {
                  <MDEditor.Markdown
                    style={{ fontSize: '20px', lineHeight: '34px' }}
                    source={data.content}
                  />
                }
              </p>
            </div>
          </div>
        )}
        <article className="mt-10">
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
