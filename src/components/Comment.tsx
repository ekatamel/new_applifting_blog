import { CommentType } from "../types/CommentInterface";

interface Props {
  comment: CommentType;
}

const Comment = ({ comment }: Props) => {
  return (
    <section>
      <p>{comment.author}</p>
      <p>{comment.content}</p>
      <p>{comment.score}</p>
    </section>
  );
};

export default Comment;
