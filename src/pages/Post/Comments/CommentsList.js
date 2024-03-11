import Loading from "components/Loading";
import { Divider, Button } from "antd";
import styles from "./styles.module.css";
import { useLazyQuery } from "@apollo/client";
import { GET_POST_COMMENTS, COMMENTS_SUBSCRIPTIONS } from "../queries";
import { Avatar, List } from "antd";
import { useEffect } from "react";
import NewCommentForm from "./NewCommentForm";

function CommentsList({ post_id }) {
  const [loadComments, { called, loading, data, subscribeToMore }] =
    useLazyQuery(GET_POST_COMMENTS, { variables: { id: post_id } });

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: COMMENTS_SUBSCRIPTIONS,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          return {
            post: {
              ...prev.post,
              comments: [
                ...prev.post.comments,
                subscriptionData.data.commentCreated,
              ],
            },
          };
        },
      });
    }
  }, [loading, called, subscribeToMore]);

  if (called && loading) return <Loading />;

  return (
    <>
      <Divider>Comments</Divider>
      {!called && (
        <div className={styles.showCommentsButton}>
          <Button loading={loading} onClick={() => loadComments()}>
            Show Comments
          </Button>
        </div>
      )}

      {!loading && data && (
        <>
          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data.post.comments}
            renderItem={(item) => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.user.profile_photo} />}
                  title={item.user.fullName}
                  description={item.text}
                />
              </List.Item>
            )}
          />
          <Divider>New Comment</Divider>
          <NewCommentForm post_id={post_id} />
        </>
      )}
    </>
  );
}

export default CommentsList;
