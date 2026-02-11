import moment from "moment";
import { useMutation, useQuery } from "@apollo/client";
import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { ADD_EVENT, GET_LOCATIONS } from "./queries";

const { Option } = Select;

function EventForm() {
  const { loading: locations_loading, data: locations_data } =
    useQuery(GET_LOCATIONS);

  const [saveEvent, { loading }] = useMutation(ADD_EVENT);

  const handleSubmit = async (values) => {
    try {
      values.date = moment(values.date.$d).format("YYYY-MM-DD");
      await saveEvent({ variables: { data: { ...values, user_id: "1" } } });
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
      disabled={loading}
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

      <Form.Item
        label="Description"
        name="desc"
        rules={[
          {
            required: true,
            message: "Please input your description!",
          },
        ]}
      >
        <Input.TextArea
          rows={4}
          size="large"
          placeholder="Enter event description"
        />
      </Form.Item>

      <Form.Item
        label="Event Date"
        name="date"
        rules={[
          {
            required: true,
            message: "Please input your date!",
          },
        ]}
      >
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
              message: "Please input your start time!",
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
              message: "Please input your end time!",
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

      <Form.Item
        name="location_id"
        label="Location"
        rules={[
          {
            required: true,
            message: "Please select your location!",
          },
        ]}
      >
        <Select
          disabled={locations_loading}
          loading={locations_loading}
          size="large"
        >
          {locations_data &&
            locations_data.locations.map((location) => (
              <Option key={location.id} value={location.id}>
                {location.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} size="large">
          Add Event
        </Button>
      </Form.Item>
    </Form>
  );
}
export default EventForm;
