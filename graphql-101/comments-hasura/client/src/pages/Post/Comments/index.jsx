import { useSubscription } from "@apollo/client";
import { Divider, List } from "antd";
import { COMMENTS_SUBSCRIPTIONS } from "../queries";
import Comment from "components/Comment";
import NewCommentForm from "./NewCommentForm";

function Comments({ post_id }) {
  const { data, loading, error } = useSubscription(COMMENTS_SUBSCRIPTIONS, {
    variables: { post_id },
  });

  return (
    <div>
      <Divider orientation="left">Comments</Divider>
      {error && <div>Error: {error.message}</div>}
      {!loading && data && (
        <List
          className="comment-list"
          header={data.comments.length ? `${data.comments.length} replies` : ""}
          itemLayout="horizontal"
          dataSource={data.comments}
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
      <Divider orientation="left">New Comment</Divider>
      <NewCommentForm post_id={post_id} />
    </div>
  );
}

export default Comments;
