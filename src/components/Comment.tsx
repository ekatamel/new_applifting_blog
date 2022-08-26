import { CommentType } from '../types/CommentInterface';
import { AiOutlineUp, AiOutlineDown } from 'react-icons/ai';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { Request } from '../utils/requests';
import { ArticleDetailType } from '../types/ArticleInterface';

interface Props {
  comment: CommentType;
  articleId: string;
}

const Comment = ({ comment, articleId }: Props) => {
  const [doubleScoreError, setDoubleScoreError] = useState<string | null>(null);

  const { refetch: refetchComments } = useQuery<ArticleDetailType, Error>(
    'articleDetail',
    () => {
      return Request.loadArticle(articleId);
    },
    {
      enabled: false
    }
  );

  // Handling votes up/down
  const { mutate: upVote } = useMutation(
    () => {
      return Request.upVote(comment.commentId);
    },
    {
      onSuccess() {
        refetchComments();
      }
    }
  );

  const { mutate: downVote } = useMutation(
    () => {
      return Request.downVote(comment.commentId);
    },
    {
      onSuccess() {
        refetchComments();
      }
    }
  );

  return (
    <section className="flex gap-8">
      <div className="w-12 h-11 bg-green-600 rounded-full"></div>
      <div className="w-full">
        <p className="font-bold">{comment.author}</p>
        <p>{comment.content}</p>

        <p className="flex gap-2 items-center">
          {comment.score > 0 ? `+${comment.score}` : comment.score}
          <AiOutlineUp
            onClick={() => {
              if (comment.score === 0) {
                upVote();
              } else {
                setDoubleScoreError('You cannot vote twice');
              }
            }}
          />
          <AiOutlineDown
            onClick={() => {
              if (comment.score === 0) {
                downVote();
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
