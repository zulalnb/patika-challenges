import { Link } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import { Avatar, List } from "antd";
import { POSTS_SUBSCRIPTION } from "./queries";
import Loading from "components/Loading";

function Home() {
  const { loading, error, data } = useSubscription(POSTS_SUBSCRIPTION);

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
              title={<Link to={`/post/${item.id}`}>{item.title}</Link>}
              description={item.short_description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
