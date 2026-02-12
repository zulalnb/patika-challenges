import { useSubscription } from "@apollo/client";
import { Avatar, Badge, Flex } from "antd";
import { POST_COUNT_SUBSCRIPTION } from "./queries";

function PostCounter() {
  const { loading, data } = useSubscription(POST_COUNT_SUBSCRIPTION);

  const postCount = data?.posts_aggregate?.aggregate?.count;

  return (
    <Flex align="center" justify="flex-end" style={{ height: "100%" }}>
      <Badge size="small" count={loading ? "?" : postCount}>
        <Avatar
          size="large"
          shape="square"
          style={{ backgroundColor: "#bdc3c7", color: "#000000" }}
        >
          Posts
        </Avatar>
      </Badge>
    </Flex>
  );
}

export default PostCounter;
