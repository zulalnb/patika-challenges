import { Button, DatePicker, Form, Input, message, Select } from "antd";

const { Option } = Select;

function EventForm() {
  const handleSubmit = async () => {
    try {
      message.success("Event created successfully!", 4);
    } catch (error) {
      message.error("Failed to create event: " + error.message, 4);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={handleSubmit}
      //   disabled={loading}
      autoComplete="off"
      style={{
        backgroundColor: "#dfe4ea",
        padding: "12px 24px",
        width: "60%",
        margin: "0 auto",
        borderRadius: "8px",
      }}
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
        <Input size="large" placeholder="Enter event title" />
      </Form.Item>

      <Form.Item label="Description" name="desc">
        <Input.TextArea
          rows={4}
          size="large"
          placeholder="Enter event description"
        />
      </Form.Item>

      <Form.Item label="Event Date" name="date">
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Event Time Range"
        style={{
          marginBottom: 0,
        }}
      >
        <Form.Item
          name="from"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
        >
          <Input placeholder="From" />
        </Form.Item>
        <Form.Item
          name="to"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="To" />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          // loading={loading}
          size="large"
        >
          Add Event
        </Button>
      </Form.Item>
    </Form>
  );
}
export default EventForm;
