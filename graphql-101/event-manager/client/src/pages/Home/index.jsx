import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { Card, Flex, List, Typography } from "antd";
import { EVENTS_SUBSCRIPTION, GET_EVENTS } from "./queries";
import Loading from "components/Loading";
import styles from "./styles.module.css";
import { clipText } from "../../utils";

const { Text, Title } = Typography;

const Home = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    subscribeToMore({
      document: EVENTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log({ prev, subscriptionData });

        if (!subscriptionData.data) return prev;

        return {
          events: [subscriptionData.data.eventCreated, ...prev.events],
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
  return (
    <div>
      <List
        split={false}
        dataSource={data.events}
        renderItem={(item) => (
          <List.Item className={styles["list-item"]}>
            <Link to={`/event/${item.id}`}>
              <Card>
                <Flex justify="space-between" gap={1}>
                  <Title level={4} className={styles["event-title"]}>
                    {item.title}
                  </Title>
                  <Text className={styles.date}>
                    {moment(item.date).format("DD.MM.YYYY")}
                  </Text>
                </Flex>
                <Text>{clipText(item.desc)}...</Text>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Home;
