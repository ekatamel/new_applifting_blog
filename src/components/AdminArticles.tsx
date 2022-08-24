import React, { useState } from 'react';
import { ArticleType } from '../types/ArticleInterface';
import { useMutation, useQuery } from 'react-query';
import { Request } from '../utils/requests';
import { TenantType } from '../types/TenantInterace';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import '../styles/myarticles.scss';
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
    isLoading,
    error,
    refetch: refreshArticles
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

  return (
    <section>
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
      <div className="myarticles__header">
        <h1>My articles</h1>
        <a href="/myarticles/create-new" className="myarticles__button">
          Create new article
        </a>
      </div>

      <table className="myarticles__table">
        <tr className="myarticles__row">
          <th className="myarticles__head">Article Title</th>
          <th className="myarticles__head">Perex</th>
          <th className="myarticles__head">Author</th>
          <th className="myarticles__head"># of comments</th>
          <th className="myarticles__head">Actions</th>
        </tr>

        {data &&
          data.items.map((article) => {
            return (
              <tr key={article.articleId}>
                <td className="myarticles__data">{article.title}</td>
                <td className="myarticles__data">{article.perex}</td>
                <td className="myarticles__data">{tenantData?.name}</td>
                <AdminArticleDetail articleId={article.articleId} />
                <td className="myarticles__data">
                  <a href={`myarticles/edit/${article.articleId}`}>
                    <FiEdit2 className="myarticles__icon" />
                  </a>

                  <AiOutlineDelete
                    className="myarticles__icon"
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
