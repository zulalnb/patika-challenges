import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Image, Typography } from "antd";

import { GET_POST } from "./queries";
import Loading from "components/Loading";
import styles from "./styles.module.css";

const { Paragraph, Title } = Typography;

function Post() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, { variables: { id } });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { post } = data;

  return (
    <article>
      <Title>{post.title}</Title>
      <Image src={post.cover} />
      <Paragraph className={styles.description}>
        <p>{post.description}</p>
      </Paragraph>
    </article>
  );
}

export default Post;
