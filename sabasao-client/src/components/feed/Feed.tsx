import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Feed.module.css";
import { IPost } from "../../interfaces/post";

const Feed: React.FC<{ posts: IPost[] }> = ({ posts }) => {
  const loggedUser = useSelector((state: RootState) => state.user.user);

  return (
    <div className={styles.feed}>
      <div className={styles.userInfo}>
        {loggedUser ? (
          <div>
            Logged in as {loggedUser.firstName} {loggedUser.lastName}
          </div>
        ) : (
          "Not logged in"
        )}
      </div>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.author}>
            {post.user ? (
              <>
                {post.user.firstName} {post.user.lastName}
              </>
            ) : (
              "Unknown Author"
            )}
            <span className={styles.postDate}>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className={styles.postHeader}>
            <h2 className={styles.postTitle}>{post.title}</h2>
          </div>

          <p className={styles.postContent}>{post.content}</p>
          <img className={styles.image} src="/random.png"></img>
        </div>
      ))}
    </div>
  );
};

export default Feed;
