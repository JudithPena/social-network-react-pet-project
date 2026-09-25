import styles from "./Avatar.module.css";

const gradients = [
  ["#1e6cf2", "#7b4dff"],
  ["#ff7a59", "#ff4d8d"],
  ["#12b886", "#1e6cf2"],
  ["#f59f00", "#ff6b6b"],
  ["#7b4dff", "#e64980"],
  ["#15aabf", "#12b886"],
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Same name always gets the same gradient
const getGradient = (name) => {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const [from, to] = gradients[hash % gradients.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
};

const Avatar = ({ name, size = 44, className = "" }) => {
  return (
    <span
      className={`${styles.avatar} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38, background: getGradient(name) }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
};

export default Avatar;
