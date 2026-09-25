import { useState } from "react";
import { currentUser, posts as initialPosts } from "../../data/profile";
import CreatePost from "../CreatePost/CreatePost";
import Post from "../Post/Post";
import styles from "./ProfileTab.module.css";

const ProfilePosts = () => {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (text) => {
    const newPost = {
      id: Date.now(),
      author: currentUser.name,
      time: "только что",
      text,
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className={styles.list}>
      <CreatePost author={currentUser.name} onSubmit={addPost} />
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default ProfilePosts;
