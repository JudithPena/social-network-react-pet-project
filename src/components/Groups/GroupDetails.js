import { Link, useParams } from "react-router-dom";
import { useGroups } from "../../context/GroupsContext";
import { currentUser } from "../../data/profile";
import { membersLabel } from "../../utils/plural";
import Avatar from "../Avatar/Avatar";
import CreatePost from "../CreatePost/CreatePost";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import PageStub from "../PageStub/PageStub";
import Post from "../Post/Post";
import JoinButton from "./JoinButton";
import styles from "./Groups.module.css";

const GroupDetails = () => {
  const { id } = useParams();
  const { getGroup, postsOf, addGroupPost, toggleGroupPostLike } = useGroups();
  const group = getGroup(Number(id));

  if (!group) {
    return <PageStub title="Группа не найдена" text="Возможно, её удалили или ссылка устарела." />;
  }

  const { name, topic, image, members, description, rules, friendsInGroup, isJoined } = group;
  const posts = postsOf(group.id);

  return (
    <div className={styles.page}>
      <section className={styles.groupHeader}>
        <ImagePlaceholder image={image} className={styles.groupCover} />
        <div className={styles.groupInfo}>
          <Avatar name={name} size={96} className={styles.groupAvatar} />
          <div className={styles.groupIdentity}>
            <Link to="/groups" className={styles.backLink}>
              ← Все группы
            </Link>
            <h1 className={styles.groupName}>{name}</h1>
            <div className={styles.muted}>
              Открытая группа · {topic} · {membersLabel(members)}
            </div>
          </div>
          <JoinButton group={group} large />
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>О группе</h2>
        <p className={styles.description}>{description}</p>
        <h3 className={styles.subTitle}>Правила</h3>
        <ol className={styles.rules}>
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
        {friendsInGroup.length > 0 && (
          <>
            <h3 className={styles.subTitle}>Друзья в группе</h3>
            <ul className={styles.friends}>
              {friendsInGroup.map((friend) => (
                <li key={friend} className={styles.friend}>
                  <Avatar name={friend} size={32} />
                  <span>{friend}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      {isJoined ? (
        <CreatePost author={currentUser.name} onSubmit={(text) => addGroupPost(group.id, text)} />
      ) : (
        <p className={styles.notice}>Вступите в группу, чтобы публиковать посты.</p>
      )}

      {posts.length === 0 ? (
        <p className={styles.empty}>В группе пока нет публикаций.</p>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} onLike={() => toggleGroupPostLike(post.id)} />)
      )}
    </div>
  );
};

export default GroupDetails;
