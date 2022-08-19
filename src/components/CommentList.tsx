import Comment from './Comment';
import { CommentType } from '../types/CommentInterface';
import React, { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Request } from '../utils/requests';

interface Props {
  comments: CommentType[];
  articleId: string;
  author: string | undefined;
  // refetch: () => void;
  onClick: () => void;
}

const CommentList: FC<Props> = ({ comments, articleId, author, onClick }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const comment = {
    articleId: articleId,
    author: author,
    content: inputValue
  };

  const request = new Request(articleId, undefined, comment);

  const { mutate, error } = useMutation<Response, AxiosError>(request.postComment);

  const commentList = comments.map((comment, index) => {
    return <Comment key={index} comment={comment} articleId={articleId} />;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
    setInputValue('');
    onClick();
    // refetch();
    // request.loadArticle();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="comments">
      <h2>Comments ({comments.length})</h2>
      <section className="comment">
        <div className="comment__image"></div>
        <div className="comment__content">
          {/* <p className="comment__author">{comment.author}</p> */}
          <form
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <input
              type="text"
              name="content"
              placeholder="Enter your comment"
              onChange={(e) => {
                handleChange(e);
              }}
              value={inputValue}
            />
          </form>
          {error && <p>Error happenned</p>}
        </div>
      </section>

      {commentList}
    </div>
  );
};

export default CommentList;
