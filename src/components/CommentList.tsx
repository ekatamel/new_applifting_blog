import Comment from "./Comment";
import { CommentType } from "../types/CommentInterface";
import { FC } from "react";

interface Props {
  comments: CommentType[];
}

const CommentList: FC<Props> = ({ comments }) => {
  const commentList = comments.map((comment, index) => {
    return <Comment key={index} comment={comment} />;
  });

  return <div>{commentList}</div>;
};

export default CommentList;
