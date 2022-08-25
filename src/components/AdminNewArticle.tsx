import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Request } from '../utils/requests';
import { useForm } from 'react-hook-form';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Markdown from './Markdown';

interface FormValuesType {
  title: string;
  perex: string;
  content: string;
  imageId: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminNewArticle = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [value, setValue] = useState<string | undefined>('Supports markdown. Yay!');
  const [image, setImage] = useState<File | null>(null);

  // Image preview handling;
  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null | undefined>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValuesType>();

  const postArticle = (data: FormValuesType) => {
    return Request.postArticle(data);
  };

  const { mutate: submitArticle, error: submitError } = useMutation(postArticle, {
    onSuccess() {
      setOpen(true);
      setImage(null);
      setFileDataURL(null);

      reset();
      setValue('');
    },
    onError() {
      setOpenError(true);
    }
  });

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
    <section>
      <form
        action=""
        className="myarticles__form"
        onSubmit={handleSubmit(async (data) => {
          if (image) {
            const response = await Request.postImage(image);
            submitArticle({ ...data, content: value || '', imageId: response[0].imageId });
          } else {
            submitArticle({ ...data, content: value || '' });
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
            {<img className="myarticles__image" src={fileDataURL.toString()} alt="preview" />}
          </p>
        ) : null}
        <input
          className="myarticles__input"
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
              {/* Possible improvements: Notify about precise type of an error */}
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

export default AdminNewArticle;
