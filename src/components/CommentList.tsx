import Comment from './Comment';
import { CommentType } from '../types/CommentInterface';
import React, { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Request } from '../utils/requests';
import { ArticleDetailType } from '../types/ArticleInterface';

interface Props {
  comments: CommentType[];
  articleId: string;
  author: string | undefined;
}

const CommentList: FC<Props> = ({ comments, articleId, author }) => {
  const [inputValue, setInputValue] = useState('');

  const comment = {
    articleId: articleId,
    author: author,
    content: inputValue
  };

  const { refetch: refetchComments } = useQuery<ArticleDetailType, Error>(
    'articleDetail',
    () => {
      return Request.loadArticle(articleId);
    },
    {
      enabled: false
    }
  );

  const { mutate, error } = useMutation<Response, AxiosError>(
    () => {
      return Request.postComment(comment);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="comments">
      <h2>Comments ({comments.length})</h2>
      <section className="comment">
        <div className="comment__image"></div>
        <div className="comment__content">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
              setInputValue('');
            }}>
            <input
              type="text"
              name="content"
              placeholder="Enter your comment"
              onChange={handleChange}
              value={inputValue}
            />
          </form>
          {error && <p>Error happened</p>}
        </div>
      </section>

      {commentList}
    </div>
  );
};

export default CommentList;
