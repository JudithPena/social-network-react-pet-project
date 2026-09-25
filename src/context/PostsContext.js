import { createContext, useContext } from "react";
import { posts as initialPosts } from "../data/posts";
import { currentUser } from "../data/profile";
import { usePersistentState } from "../hooks/usePersistentState";

// Shared posts state so the feed and the profile show the same posts and likes
const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = usePersistentState("posts", initialPosts);

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
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
          : post
      )
    );
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, toggleLike }}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
