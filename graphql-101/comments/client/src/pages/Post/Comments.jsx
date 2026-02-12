import { useLazyQuery } from "@apollo/client";
import { Button, Divider, Flex, List } from "antd";
import { GET_POST_COMMENTS } from "./queries";
import Comment from "components/Comment";

function Comments({ post_id }) {
  const [loadComments, { loading, error, data, called }] = useLazyQuery(
    GET_POST_COMMENTS,
    {
      variables: { id: post_id },
    },
  );

  const btnIsVisible = !called || (!loading && !data);

  return (
    <div>
      <Divider>Comments</Divider>
      {btnIsVisible && (
        <Flex justify="center">
          <Button loading={loading} onClick={loadComments}>
            Show Comments
          </Button>
        </Flex>
      )}
      {error && <div>Error: {error.message}</div>}
      {!loading && data && (
        <List
          className="comment-list"
          header={
            data.post.comments.length
              ? `${data.post.comments.length} replies`
              : ""
          }
          itemLayout="horizontal"
          dataSource={data.post.comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.user.fullName}
                avatar={item.user.profile_photo}
                content={item.text}
              />
            </li>
          )}
        />
      )}
    </div>
  );
}

export default Comments;
