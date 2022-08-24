import React, { FC } from 'react';
import { ArticleDetailType } from '../types/ArticleInterface';
import { Request } from '../utils/requests';
import { useQuery } from 'react-query';

interface Props {
  articleId: string;
}

const AdminArticleDetail = ({ articleId }: Props) => {
  const { data: articleData } = useQuery<ArticleDetailType, Error>(`article${articleId}`, () => {
    return Request.loadArticleComments(articleId);
  });

  return <td className="myarticles__data">{articleData?.comments.length}</td>;
};

export default AdminArticleDetail;
