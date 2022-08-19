import { CommentType } from '../types/CommentInterface';
import '../styles/comments.scss';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { Request } from '../utils/requests';

interface Props {
  comment: CommentType;
  articleId: string;
}

const Comment = ({ comment, articleId }: Props) => {
  const [score, setScore] = useState(comment.score);
  const [doubleScoreError, setDoubleScoreError] = useState<string | null>(null);

  const request = new Request(articleId, comment.commentId);

  // Handling votes up/down
  const { mutate: upVote } = useMutation(request.upVote, {
    onSuccess() {
      console.log('Success');
    }
  });

  const { mutate: downVote } = useMutation(request.downVote, {
    onSuccess() {
      console.log('Success');
    }
  });

  return (
    <section className="comment">
      <div className="comment__image"></div>
      <div className="comment__content">
        <p className="comment__author">{comment.author}</p>
        <p>{comment.content}</p>

        <p>
          {score > 0 ? `+${score}` : score}
          <AiOutlineUp
            onClick={() => {
              if (score === 0) {
                upVote();
                setScore(score + 1);
              } else {
                setDoubleScoreError('You cannot vote twice');
              }
            }}
          />
          <AiOutlineDown
            onClick={() => {
              if (score === 0) {
                downVote();
                setScore(score - 1);
              } else {
                setDoubleScoreError('You cannot vote twice');
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
