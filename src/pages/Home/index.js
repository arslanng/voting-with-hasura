import { useEffect } from "react";
import { Avatar, List } from "antd";
import { useQuery } from "@apollo/client";
import Loading from "components/Loading";
import { GET_POSTS, POSTS_SUBSCRIPTION } from "./queries";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Home() {
  const {
    loading,
    error,
    data,
    subscribeToMore, // dinlemek için gereken fonksiyon
  } = useQuery(GET_POSTS);

  useEffect(() => {
    // veri değiştiğinde reactta kullanılması için useEffect hooku kullanıldı.
    subscribeToMore({
      document: POSTS_SUBSCRIPTION, // dinlenilecek sorgu
      updateQuery: (
        prev, // mevcut durum
        { subscriptionData } // dinlenen kanaldan gelen
      ) => {
        console.log("prev", prev);
        console.log("subscriptionData", subscriptionData);
        if (!subscriptionData.data) return prev;

        return {
          posts: [subscriptionData.data.postCreated, ...prev.posts], // posts tanımı cache olarak tutulan veri keyinden alındı
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
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={data.posts}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={<Avatar src={item.user.profile_photo} />}
              title={
                <Link to={`/post/${item._id}`} className={styles.listTitle}>
                  {item.title}
                </Link>
              }
              description={
                <Link to={`/post/${item._id}`} className={styles.listItem}>
                  {item.short_description}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
