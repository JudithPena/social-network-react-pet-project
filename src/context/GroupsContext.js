import { createContext, useContext } from "react";
import { groupPosts as initialGroupPosts, groups as allGroups, joinedGroupIds } from "../data/groups";
import { currentUser } from "../data/profile";
import { usePersistentState } from "../hooks/usePersistentState";

// Membership and group posts for the groups pages and bookmarks
const GroupsContext = createContext(null);

export const GroupsProvider = ({ children }) => {
  const [joinedIds, setJoinedIds] = usePersistentState("joinedGroups", joinedGroupIds);
  const [groupPosts, setGroupPosts] = usePersistentState("groupPosts", initialGroupPosts);

  const toggleJoin = (id) => {
    setJoinedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const addGroupPost = (groupId, text) => {
    const newPost = {
      id: Date.now(),
      groupId,
      author: currentUser.name,
      time: "только что",
      text,
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setGroupPosts((prev) => [newPost, ...prev]);
  };

  const toggleGroupPostLike = (id) => {
    setGroupPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) } : post
      )
    );
  };

  // Counts in the mock data already include the user for groups joined from the start
  const groups = allGroups.map((group) => {
    const isJoined = joinedIds.includes(group.id);
    const wasJoined = joinedGroupIds.includes(group.id);
    return { ...group, isJoined, members: group.members + (isJoined ? 1 : 0) - (wasJoined ? 1 : 0) };
  });

  const value = {
    groups,
    getGroup: (id) => groups.find((group) => group.id === id),
    groupPosts,
    postsOf: (groupId) => groupPosts.filter((post) => post.groupId === groupId),
    toggleJoin,
    addGroupPost,
    toggleGroupPostLike,
  };

  return <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>;
};

export const useGroups = () => useContext(GroupsContext);
