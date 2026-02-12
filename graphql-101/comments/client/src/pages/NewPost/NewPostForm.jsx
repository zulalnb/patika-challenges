import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function NewPostForm() {
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        name="user"
        label="User"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          size="large"
          // onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default NewPostForm;
