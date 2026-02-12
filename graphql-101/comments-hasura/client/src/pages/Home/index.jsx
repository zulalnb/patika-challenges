import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Avatar, List } from "antd";
import { GET_POSTS, POSTS_SUBSCRIPTION } from "./queries";
import Loading from "components/Loading";

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_POSTS);

  useEffect(() => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          posts: [subscriptionData.data.postCreated, ...prev.posts],
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
        loading={false}
        itemLayout="horizontal"
        dataSource={data.posts}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.user.profile_photo} />}
              title={<Link to={`/post/${item._id}`}>{item.title}</Link>}
              description={item.short_description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
