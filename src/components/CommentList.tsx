import Comment from './Comment';
import { CommentType, CommentPostType } from '../types/CommentInterface';
import React, { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Request } from '../utils/requests';
import { ArticleDetailType } from '../types/ArticleInterface';
import { useForm } from 'react-hook-form';

interface Props {
  comments: CommentType[];
  articleId: string;
  author: string | undefined;
}

const CommentList: FC<Props> = ({ comments, articleId, author }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<CommentPostType>();

  const { refetch: refetchComments } = useQuery<ArticleDetailType, Error>(
    'articleDetail',
    () => {
      return Request.loadArticle(articleId);
    },
    {
      enabled: false
    }
  );

  const onSubmit = (content: any) => {
    mutate(content);
  };

  const { mutate, error } = useMutation<Response, AxiosError>(
    (content: any) => {
      console.log({ articleId, author, content });
      return Request.postComment({ articleId, author, ...content });
    },
    {
      onSuccess() {
        refetchComments();
      }
    }
  );

  const commentList = comments.map((comment) => {
    return <Comment key={comment.commentId} comment={comment} articleId={articleId} />;
  });

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      <section className="flex gap-8">
        <div className="w-12 h-11 bg-green-600 rounded-full"></div>
        <div className="w-full">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="h-full flex items-center w-full">
            <input
              type="text"
              {...register('content', {
                required: true,
                minLength: { value: 3, message: 'Minimum 3 characters' }
              })}
              placeholder="Enter your comment"
              className="border-solid border-2 border-grey-400 rounded h-5/6 w-full"
            />
            {errors.content && <p>{errors.content?.message}</p>}
          </form>
          {/* {error && <p>Error happened</p>} */}
        </div>
      </section>

      {commentList}
    </div>
  );
};

export default CommentList;
