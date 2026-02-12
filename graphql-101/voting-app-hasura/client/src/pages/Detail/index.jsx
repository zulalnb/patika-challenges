import { useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { NEW_VOTE_MUTATION, QUESTION_DETAIL_SUBSCRIPTION } from "./queries";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function Detail() {
  const [selectedOptionId, setSelectedOptionId] = useState();

  const { id } = useParams();

  const { loading, error, data } = useSubscription(
    QUESTION_DETAIL_SUBSCRIPTION,
    { variables: { id } },
  );

  const [newVote, { loading: loading_vote }] = useMutation(NEW_VOTE_MUTATION);

  const handleClickVote = async () => {
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

  return (
    <div>
      <h2>{title}</h2>

      {options.map((option) => (
        <label key={option.id} htmlFor={option.id}>
          <input
            type="radio"
            name="selected"
            value={option.id}
            onChange={({ target }) => setSelectedOptionId(target.value)}
          />
          <span>{option.title}</span>
        </label>
      ))}

      <button disabled={loading_vote} onClick={handleClickVote}>
        Vote
      </button>
    </div>
  );
}

export default Detail;
