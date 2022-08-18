import Comment from "./Comment";
import { CommentType } from "../types/CommentInterface";
import React, { FC, useState } from "react";
import { CommentPostType } from "../types/CommentInterface";
import { useMutation } from "react-query";
import { axiosInstance } from "../utils/axios-instance";
import { AxiosError } from "axios";

interface Props {
  comments: CommentType[];
  articleId: string;
  author: string | undefined;
  refetch: () => {};
}

const CommentList: FC<Props> = ({ comments, articleId, author, refetch }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [contentError, setContentError] = useState(null);

  const { mutate, data, error, isError } = useMutation<Response, AxiosError>(
    async () => {
      const comment = {
        articleId: articleId,
        author: author,
        content: inputValue,
      };

      const response = await axiosInstance.post("/comments", comment);

      return response.data;
    }
  );

  const commentList = comments.map((comment, index) => {
    return <Comment key={index} comment={comment} refetch={refetch} />;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(undefined, {
      onError: (err) => {
        console.log("err", err.response?.data);
      },
    });

    setInputValue("");
    refetch();
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
            }}
          >
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
