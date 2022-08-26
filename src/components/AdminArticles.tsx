import React, { useState } from 'react';
import { ArticleType } from '../types/ArticleInterface';
import { useMutation, useQuery } from 'react-query';
import { Request } from '../utils/requests';
import { TenantType } from '../types/TenantInterace';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import AdminArticleDetail from './AdminArticleDetail';

interface Articles {
  items: ArticleType[];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminArticles = () => {
  const [open, setOpen] = useState(false);
  const {
    data,
    refetch: refreshArticles,
    isLoading
  } = useQuery<Articles, Error>('articles', Request.loadArticles);
  const { data: tenantData } = useQuery<TenantType>('tenant', Request.loadTenant);

  const { mutate: articleDelete } = useMutation(
    (id: string) => {
      return Request.deleteArticle(id);
    },
    {
      onSuccess() {
        setOpen(true);
        refreshArticles();
      }
    }
  );

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <section className="mt-16 w-8/12 mx-auto">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={2000}
        onClose={(e, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setOpen(false);
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Your article was successfully deleted!
        </Alert>
      </Snackbar>
      <div className="flex gap-8">
        <h1 className="text-4xl font-bold">My articles</h1>
        <a href="/myarticles/create-new" className="bg-blue-500 text-white p-2 rounded">
          Create new article
        </a>
      </div>

      <table className="w-full mt-16 table-fixed">
        <tr className="">
          <th className="border-gray-200 border-b-4 w-1/4">Article Title</th>
          <th className="border-gray-200 border-b-4 w-2/5">Perex</th>
          <th className="border-gray-200 border-b-4 w-40">Author</th>
          <th className="border-gray-200 border-b-4 w-40"># of comments</th>
          <th className="border-gray-200 border-b-4 w-40">Actions</th>
        </tr>

        {data &&
          data.items.map((article) => {
            return (
              <tr key={article.articleId}>
                <td className="border-gray-200 border-b-2 w-1/4 overflow-hidden overflow-ellipsis whitespace-nowrap p-2">
                  {article.title}
                </td>
                <td
                  className="border-gray-200 border-b-2 w-2/5 overflow-hidden overflow-ellipsis whitespace-nowrap p-2"
                  style={{ width: '500px' }}>
                  {article.perex}
                </td>
                <td className="border-gray-200 border-b-2 w-40 p-2">{tenantData?.name}</td>
                <AdminArticleDetail articleId={article.articleId} />
                <td className="border-gray-200 border-b-2 w-40 text-center p-2">
                  <a href={`myarticles/edit/${article.articleId}`}>
                    <FiEdit2 className="inline text-2xl mr-2" />
                  </a>

                  <AiOutlineDelete
                    className="inline text-3xl ml-2"
                    onClick={() => {
                      articleDelete(article.articleId);
                    }}
                  />
                </td>
              </tr>
            );
          })}
      </table>
    </section>
  );
};

export default AdminArticles;
