import { useState } from "react";
import { useMutation } from "@apollo/client";
import { NEW_QUESTION_MUTATION } from "./queries";

const initialOptions = [{ title: "" }, { title: "" }];

function NewQuestion() {
  const [addQuestion, { loading }] = useMutation(NEW_QUESTION_MUTATION);

  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(initialOptions);

  const handleChangeOption = ({ target }) => {
    const index = Number(target.id);
    const value = target.value;

    const newOptions = options.map((option, i) =>
      i === index ? { ...option, title: value } : option,
    );

    setOptions(newOptions);
  };

  const handleSave = () => {
    const filledOptions = options.filter((option) => option.title !== "");

    if (title === "") {
      alert("You need question title");
      return;
    }
    if (filledOptions.length < 2) {
      alert("You need at least two options");
      return;
    }

    addQuestion({
      variables: { input: { title, options: { data: filledOptions } } },
    });

    setTitle("");
    setOptions(initialOptions);
  };

  return (
    <div>
      <h2>Question</h2>
      <input
        placeholder="Type your question"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        disabled={loading}
      />
      <h2>Options</h2>
      {options.map((option, index) => (
        <div key={index}>
          <input
            id={index}
            placeholder={`Option ${index + 1}`}
            value={option.title}
            onChange={handleChangeOption}
            disabled={loading}
          />
        </div>
      ))}

      <button
        disabled={loading}
        onClick={() => setOptions([...options, { title: "" }])}
      >
        New option
      </button>

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default NewQuestion;
