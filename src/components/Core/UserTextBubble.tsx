import { Character } from "@/src/types/ttrpg";
import { Avatar } from "../TTRPG/Avatar";
import styles from "./UserTextBubble.module.css";

type Props = {
  icon?: Character["icon"];
  color?: Character["color"];
  children: React.ReactNode;
  width?: "full" | "fit";
};

export const UserTextBubble: React.FC<Props> = ({
  icon,
  color,
  width = "fit",
  children,
}) => {
  return (
    <article
      className={styles.userTextBubble}
      style={{
        width: width === "full" ? "100%" : "fit-content",
      }}
    >
      <Avatar icon={icon} color={color} />
      <div>{children}</div>
    </article>
  );
};
