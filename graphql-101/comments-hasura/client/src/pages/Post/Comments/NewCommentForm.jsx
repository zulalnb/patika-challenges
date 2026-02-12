import { useRef, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT_MUTATION, GET_USERS } from "./queries";

const { Option } = Select;

const CommentInput = (props) => {
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
  const { id, value = {}, onChange } = props;
  const [text, setText] = useState("");
  const [user, setUser] = useState();
  const triggerChange = (changedValue) => {
    onChange?.({
      text,
      user_id: user,
      ...value,
      ...changedValue,
    });
  };
  const onTextChange = (e) => {
    if (!("text" in value)) {
      setText(e.target.value);
    }
    triggerChange({
      text: e.target.value,
    });
  };
  const onUserChange = (newUser) => {
    if (!("user" in value)) {
      setUser(newUser);
    }
    triggerChange({
      user_id: newUser,
    });
  };

  return (
    <span id={id}>
      <Input
        type="text"
        value={value.text || text}
        onChange={onTextChange}
        placeholder="Comment"
        style={{
          width: 250,
        }}
      />
      <Select
        placeholder="Select user"
        value={value.user_id}
        onChange={onUserChange}
        disabled={get_users_loading}
        loading={get_users_loading}
        style={{
          width: 180,
          margin: "0 8px",
        }}
      >
        {users_data &&
          users_data.users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.fullName}
            </Option>
          ))}
      </Select>
    </span>
  );
};

function NewCommentForm({ post_id }) {
  const [saveComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION);

  const formRef = useRef();

  const handleSubmit = async (values) => {
    try {
      await saveComment({ variables: values });
      message.success("Comment submit successfully!", 3);
      formRef.current.resetFields();
    } catch (error) {
      message.error("Failed to submit comment: " + error.message, 10);
    }
  };

  const checkComment = (_, value) => {
    if (value.text.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please input your comment!"));
  };
  return (
    <Form
      ref={formRef}
      disabled={loading}
      name="customized_form_controls"
      layout="inline"
      onFinish={handleSubmit}
      initialValues={{
        input: {
          text: "",
          post_id,
        },
      }}
    >
      <Form.Item
        name="input"
        rules={[
          {
            validator: checkComment,
          },
        ]}
      >
        <CommentInput />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewCommentForm;
