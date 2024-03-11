import styles from "./styles.module.css";
import { Badge } from "antd";
import { useSubscription } from "@apollo/client";
import { POST_COUNT_SUBSCRİPTİON } from "./queries";

function PostCounter() {
  const {loading, data} = useSubscription(POST_COUNT_SUBSCRİPTİON);
  
  return (
    <div className={styles.container}>
      <Badge count={loading ? "?" : data.postsCount }>
        <span className={styles.counterTitle}>Post{loading ? "" : data.postsCount > 1 && "s"}</span>
      </Badge>
    </div>
  );
}

export default PostCounter;
