import styles from "./styles.module.css";

import Loading from "components/Loading";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST } from "./queries";
import { Typography, Image } from "antd";
import CommentsList from "./Comments/CommentsList";
const { Title } = Typography;

function Post() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { post } = data;

  return (
    <div>
      <Title level={3}>{post.title}</Title>
      <Image src={post.cover} />
      <div className={styles.description}>{post.description}</div>
      <CommentsList post_id={id}/>
    </div>
  );
}

export default Post;
