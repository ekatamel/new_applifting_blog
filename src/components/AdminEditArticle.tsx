import React, { useEffect } from 'react';
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
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null | undefined>(null);

  const { data: articleData } = useQuery<ArticleDetailType, Error>(
    'articleDetail',
    () => {
      return Request.loadArticle(id);
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
    formState: { errors }
  } = useForm<EditArticleType>();

  const { mutate: editArticle, error: submitError } = useMutation(
    (data: EditArticleType) => {
      return Request.updateArticle(data);
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

  const { mutate: postImage } = useMutation(Request.postImage, {
    onSuccess(data) {
      if (image) {
        editArticle({
          ...articleData,
          articleId: id,
          content: value || '',
          imageId: data[0].imageId
        });
      } else {
        editArticle({
          ...data,
          articleId: id,
          content: value || ''
        });
      }
    }
  });

  const onSubmit = async () => {
    if (image) {
      postImage(image);
    }
  };

  useEffect(() => {
    let fileReader: FileReader;
    let isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const result: string | ArrayBuffer | null | undefined = e.target?.result;
        if (e.target && !isCancel) {
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
    <section className="w-10/12 mx-auto mt-16">
      <form action="" className="w-7/12" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-8 mb-8">
          <h1 className="text-4xl font-bold">Edit article</h1>
          <input
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            value="Publish Article"
          />
        </div>

        <label className="block mb-2" htmlFor="title">
          Article Title
        </label>
        <input
          className="border-2 border-gray-200 w-full mb-8 h-9 rounded-sm px-2"
          type="text"
          placeholder="My First Article"
          defaultValue={articleData?.title}
          id="title"
          {...register('title', {
            required: 'Title is required.',
            minLength: { value: 10, message: 'Title mush have at least 10 characters' }
          })}
        />
        <p>{errors.title?.message}</p>

        <label className="block mb-2" htmlFor="perex">
          Article Perex
        </label>
        <input
          className="border-2 border-gray-200 w-full mb-8 h-9 rounded-sm px-2"
          type="text"
          placeholder="My First Perex"
          defaultValue={articleData?.perex}
          id="perex"
          {...register('perex', {
            required: 'Perex is required.',
            minLength: { value: 20, message: 'Perex mush have at least 20 characters' }
          })}
        />
        <p>{errors.perex?.message}</p>

        <p>{errors.content?.message}</p>

        {/* Image upload */}
        <label className="block mb-2">Featured image</label>
        {fileDataURL ? (
          <p className="img-preview-wrapper">
            {<img src={fileDataURL.toString()} alt="preview" />}
          </p>
        ) : (
          articleData && (
            <Image imageId={articleData?.imageId} className="w-28 h-20 bg-cover bg-center mb-3" />
          )
        )}

        <label htmlFor="image" className="bg-gray-500 text-white p-2 rounded">
          Upload an image
        </label>

        <input
          className="invisible mb-8"
          type="file"
          name="image"
          id="image"
          formEncType="multipart/form-data"
          onChange={(e) => {
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

            if (submitError) {
              setOpenError(false);
            } else {
              setOpen(false);
            }
          }}>
          {submitError ? (
            <Alert severity="error" sx={{ width: '100%' }}>
              Something went wrong. Please try again later
            </Alert>
          ) : (
            <Alert severity="success" sx={{ width: '100%' }}>
              Your article was successfully published!
            </Alert>
          )}
        </Snackbar>
        <Markdown value={value} setValue={setValue} />
      </form>
    </section>
  );
};

export default AdminEditArticle;
