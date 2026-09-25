import { Route, Routes } from "react-router-dom";
import { useFriends } from "../../context/FriendsContext";
import PageStub from "../PageStub/PageStub";
import Tabs from "../Tabs/Tabs";
import FriendsAll from "./FriendsAll";
import FriendsRequests from "./FriendsRequests";
import FriendsSent from "./FriendsSent";
import FriendsSuggestions from "./FriendsSuggestions";
import styles from "./Friends.module.css";

const Friends = () => {
  const { friends, requests, sent, suggestions } = useFriends();

  const tabs = [
    { path: "/friends", label: "Все друзья", count: friends.length },
    { path: "/friends/requests", label: "Заявки", count: requests.length },
    { path: "/friends/sent", label: "Отправленные", count: sent.length },
    { path: "/friends/suggestions", label: "Рекомендации", count: suggestions.length },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.title}>Друзья</h1>
        <Tabs items={tabs} label="Разделы друзей" />
      </section>

      <Routes>
        <Route index element={<FriendsAll />} />
        <Route path="requests" element={<FriendsRequests />} />
        <Route path="sent" element={<FriendsSent />} />
        <Route path="suggestions" element={<FriendsSuggestions />} />
        <Route
          path="*"
          element={<PageStub title="Страница не найдена" text="В разделе друзей нет такой страницы." />}
        />
      </Routes>
    </div>
  );
};

export default Friends;
