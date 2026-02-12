import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Flex, Form, Input, message, Select } from "antd";
import { GET_USERS, NEW_POST_MUTATION } from "./queries";

const { Option } = Select;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function NewPostForm() {
  const [savePost, { loading }] = useMutation(NEW_POST_MUTATION);

  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log("submit", values);
    try {
      await savePost({ variables: { data: values } });
      message.success("Post save successfully!", 4);
      navigate("/");
    } catch (error) {
      message.error("Failed to save post: " + error.message, 4);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      disabled={loading}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your title!",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item label="Short Description" name="short_description">
        <Input size="large" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} size="large" />
      </Form.Item>

      <Form.Item
        name="cover"
        label="Cover"
        rules={[
          {
            type: "url",
            warningOnly: true,
          },
          {
            type: "string",
            min: 6,
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        name="user_id"
        label="User"
        rules={[
          {
            required: true,
            message: "Please select your user!",
          },
        ]}
      >
        <Select
          disabled={get_users_loading}
          loading={get_users_loading}
          size="large"
        >
          {users_data &&
            users_data.users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.fullName}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Flex justify="flex-end">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}
export default NewPostForm;
