import { usePosts } from "../../context/PostsContext";
import { currentUser } from "../../data/profile";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import Stories from "../Stories/Stories";
import styles from "./Feed.module.css";

const Feed = () => {
  const { posts, addPost, toggleLike } = usePosts();

  return (
    <div className={styles.feed}>
      <h1 className={styles.visuallyHidden}>Лента</h1>
      <Stories />
      <CreatePost author={currentUser.name} onSubmit={addPost} />
      {posts.map((post) => (
        <Post key={post.id} {...post} onLike={() => toggleLike(post.id)} />
      ))}
    </div>
  );
};

export default Feed;
