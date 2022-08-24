import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Request } from '../utils/requests';
import { useForm } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Markdown from './Markdown';
import { useParams } from 'react-router-dom';
import { ArticleDetailType, EditArticleType } from '../types/ArticleInterface';
import Image from './Image';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminEditArticle = () => {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [value, setValue] = useState<string | undefined>('Supports markdown. Yay!');
  const [image, setImage] = useState<File | null>(null);

  // Image preview handling;
  const [fileDataURL, setFileDataURL] = useState(null);

  const { data, error, isLoading } = useQuery<ArticleDetailType, Error>(
    'articleDetail',
    () => {
      const response = Request.loadArticle(id);
      return response;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setValue(data?.content);
      }
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditArticleType>();

  const { mutate: editArticle, error: submitError } = useMutation(
    async (data: EditArticleType) => {
      const response = await Request.updateArticle(data);
      console.log(response);
      return response;
    },
    {
      onSuccess() {
        setOpen(true);

        // reset();
      },
      onError() {
        setOpenError(true);
      }
    }
  );

  useEffect(() => {
    let fileReader: any,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);

  return (
    <section>
      <form
        action=""
        className="myarticles__form"
        onSubmit={handleSubmit(async (data) => {
          if (image) {
            const response = await Request.postImage(image);

            editArticle({
              ...data,
              articleId: id,
              content: value || '',
              imageId: response[0].imageId
            });
          } else {
            editArticle({
              ...data,
              articleId: id,
              content: value || ''
            });
          }
        })}>
        <div className="myarticles__header">
          <h1>Create new article</h1>
          <input type="submit" className="myarticles__button" value="Publish Article" />
        </div>

        <label className="myarticles__label" htmlFor="title">
          Article Title
        </label>
        <input
          className="myarticles__input"
          type="text"
          placeholder="My First Article"
          defaultValue={data?.title}
          id="title"
          {...register('title', {
            required: 'Title is required.',
            minLength: { value: 10, message: 'Title mush have at least 10 characters' }
          })}
        />
        <p>{errors.title?.message}</p>

        <label className="myarticles__label" htmlFor="perex">
          Article Perex
        </label>
        <input
          className="myarticles__input"
          type="text"
          placeholder="My First Perex"
          defaultValue={data?.perex}
          id="perex"
          {...register('perex', {
            required: 'Perex is required.',
            minLength: { value: 20, message: 'Perex mush have at least 20 characters' }
          })}
        />
        <p>{errors.perex?.message}</p>

        <p>{errors.content?.message}</p>

        {/* Image upload */}
        <label htmlFor="image" className="myarticles__label">
          Featured image
        </label>
        {fileDataURL ? (
          <p className="img-preview-wrapper">
            {<img className="myarticles__image" src={fileDataURL} alt="preview" />}
          </p>
        ) : (
          data && <Image imageId={data?.imageId} width="100px" height="100px" />
        )}
        {/* // {data && <Image imageId={data?.imageId} width="100px" height="100px" />} */}

        <input
          className="myarticles__input"
          type="file"
          name="image"
          id="image"
          formEncType="multipart/form-data"
          onChange={(e) => {
            console.log(e.target.files?.[0] || null);
            setImage(e.target.files?.[0] || null);
          }}
        />

        <label className="myarticles__label" htmlFor="content">
          Content
        </label>

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
            Your article was successfully published!
          </Alert>
        </Snackbar>
        <>
          {submitError && (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={openError}
              autoHideDuration={2000}
              onClose={(e, reason) => {
                if (reason === 'clickaway') {
                  return;
                }

                setOpenError(false);
              }}>
              <Alert severity="error" sx={{ width: '100%' }}>
                Something went wrong. Please try again later
              </Alert>
            </Snackbar>
          )}
          <Markdown value={value} setValue={setValue} />
        </>
      </form>
    </section>
  );
};

export default AdminEditArticle;
