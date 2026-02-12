import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "./queries";

const { Option } = Select;

const CommentInput = (props) => {
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
  const { id, value = {}, onChange } = props;
  const [text, setText] = useState("");
  const [user_id, setUser_Id] = useState("1");
  const triggerChange = (changedValue) => {
    onChange?.({
      text,
      user_id,
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
    if (!("user_id" in value)) {
      setUser_Id(newUser);
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
        value={value.user_id || user_id}
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
  const onFinish = (values) => {
    console.log("Received values from form: ", values);
  };
  const checkPrice = (_, value) => {
    if (value.text.length > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please input your comment!"));
  };
  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        data: {
          text: "",
          user_id: "1",
          post_id,
        },
      }}
    >
      <Form.Item
        name="data"
        rules={[
          {
            validator: checkPrice,
          },
        ]}
      >
        <CommentInput />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewCommentForm;
