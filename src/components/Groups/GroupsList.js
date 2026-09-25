import { useState } from "react";
import { Link } from "react-router-dom";
import { useGroups } from "../../context/GroupsContext";
import Tabs from "../Tabs/Tabs";
import GroupCard from "./GroupCard";
import styles from "./Groups.module.css";

const GroupsList = ({ onlyJoined = false }) => {
  const { groups } = useGroups();
  const [query, setQuery] = useState("");

  const joinedCount = groups.filter((group) => group.isJoined).length;
  const tabs = [
    { path: "/groups", label: "Все группы", count: groups.length },
    { path: "/groups/mine", label: "Мои группы", count: joinedCount },
  ];

  const normalized = query.trim().toLowerCase();
  const visible = groups
    .filter((group) => !onlyJoined || group.isJoined)
    .filter((group) => group.name.toLowerCase().includes(normalized));

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.title}>Группы</h1>
        <Tabs items={tabs} label="Разделы групп" />
      </section>

      <input
        className={styles.search}
        type="search"
        placeholder="Поиск групп"
        aria-label="Поиск групп"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {visible.length === 0 ? (
        <p className={styles.empty}>
          {onlyJoined && joinedCount === 0 ? (
            <>
              Вы пока не состоите ни в одной группе. Посмотрите <Link to="/groups">все группы</Link>.
            </>
          ) : (
            `Групп по запросу «${query.trim()}» не найдено.`
          )}
        </p>
      ) : (
        <ul className={styles.grid}>
          {visible.map((group) => (
            <li key={group.id}>
              <GroupCard group={group} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupsList;
