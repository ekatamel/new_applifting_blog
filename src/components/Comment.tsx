import { CommentType } from "../types/CommentInterface";
import "../styles/comments.scss";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../utils/axios-instance";
import { useState } from "react";
import { Request } from "../utils/requests";

interface Props {
  comment: CommentType;
  refetch: () => {};
}

const Comment = ({ comment, refetch }: Props) => {
  const [score, setScore] = useState<number>(comment.score);
  const [doubleScoreError, setDoubleScoreError] = useState<string | null>(null);

  const request = new Request(undefined, comment.commentId);

  // Handling votes up/down
  const { mutate: mutateUp } = useMutation(request.upVote);

  const { mutate: mutateDown } = useMutation(request.downVote);

  return (
    <section className="comment">
      <div className="comment__image"></div>
      <div className="comment__content">
        <p className="comment__author">{comment.author}</p>
        <p>{comment.content}</p>

        <p>
          {score > 0 ? `+${score}` : score}{" "}
          <AiOutlineUp
            onClick={() => {
              if (score === 0) {
                mutateUp();
                setScore(score + 1);
                // refetch();
              } else {
                setDoubleScoreError("You cannot vote twice");
              }
            }}
          />
          <AiOutlineDown
            onClick={() => {
              if (score === 0) {
                mutateDown();
                setScore(score - 1);
                // refetch();
              } else {
                setDoubleScoreError("You cannot vote twice");
              }
            }}
          />
        </p>
        {doubleScoreError && <p>{doubleScoreError}</p>}
      </div>
    </section>
  );
};

export default Comment;
