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

  return <td className="border-gray-200 border-b-2 w-40 p-2">{articleData?.comments.length}</td>;
};

export default AdminArticleDetail;
