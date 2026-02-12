import { useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { NEW_VOTE_MUTATION, QUESTION_DETAIL_SUBSCRIPTION } from "./queries";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function Detail() {
  const [selectedOptionId, setSelectedOptionId] = useState();
  const [isVoted, setIsVoted] = useState(false);

  const { id } = useParams();

  const { loading, error, data } = useSubscription(
    QUESTION_DETAIL_SUBSCRIPTION,
    { variables: { id } },
  );

  const [newVote, { loading: loading_vote }] = useMutation(NEW_VOTE_MUTATION, {
    onCompleted: () => {
      setIsVoted(true);
    },
  });

  const handleClickVote = () => {
    if (!selectedOptionId) {
      return;
    }

    newVote({ variables: { input: { option_id: selectedOptionId } } });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const {
    questions_by_pk: { options, title },
  } = data;

  const total = options.reduce(
    (t, value) => t + value.votes_aggregate.aggregate.count,
    0,
  );

  return (
    <div>
      <h2>{title}</h2>

      {options.map((option) => (
        <div key={option.id}>
          <label htmlFor={option.id}>
            <input
              id={option.id}
              type="radio"
              name="selected"
              value={option.id}
              onChange={({ target }) => setSelectedOptionId(target.value)}
            />
            <span>{option.title}</span>
            {isVoted && (
              <span className="vote-count">
                (
                {(
                  (option.votes_aggregate.aggregate.count * 100) /
                  (total || 1)
                ).toFixed(2)}
                %)
              </span>
            )}
          </label>

          {isVoted && (
            <div>
              <progress
                value={option.votes_aggregate.aggregate.count}
                max={total}
              />
            </div>
          )}
        </div>
      ))}

      {!isVoted && (
        <button disabled={loading_vote} onClick={handleClickVote}>
          Vote
        </button>
      )}
    </div>
  );
}

export default Detail;
