import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { List, Typography } from "antd";
import { GET_EVENT, PARTICIPANTS_SUBSCRIPTION } from "./queries";
import Loading from "components/Loading";

const { Paragraph, Text, Title } = Typography;

function Event() {
  const { id } = useParams();
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENT, {
    variables: { id },
  });

  useEffect(() => {
    subscribeToMore({
      document: PARTICIPANTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log({ prev, subscriptionData });

        if (!subscriptionData.data) return prev;
        const newParticipantItem = subscriptionData.data.participantAdded;

        return {
          event: {
            ...prev.event,
            participants: [...prev.event.participants, newParticipantItem],
          },
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { event } = data;

  return (
    <div>
      <Title>{event.title}</Title>
      <Text strong>Date: </Text>
      <Text>{moment(event.date).format("DD.MM.YYYY")}</Text>
      <Paragraph>{event.desc}</Paragraph>
      <div>
        <Text strong>Owner: </Text>
        <Text>{event.user.username}</Text>
      </div>
      <div>
        <Text strong>Location: </Text>
        <Text>{event.location.name}</Text>
      </div>
      <div>
        <Title level={4}>Participants</Title>
        {event.participants && (
          <List
            size="small"
            split={false}
            dataSource={event.participants}
            renderItem={(item) => (
              <List.Item style={{ padding: "4px 0 8px" }}>
                {item.user.username}
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}

export default Event;
