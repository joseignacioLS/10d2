import styles from "./UserTextBubble.module.css";

type Props = {
  imgSrc?: string;
  color?: string;
  children: React.ReactNode;
  width?: "full" | "fit";
};

export const UserTextBubble: React.FC<Props> = ({
  imgSrc = "/chicken.svg",
  color,
  width = "fit",
  children,
}) => {
  return (
    <article
      className={styles.userTextBubble}
      style={{
        backgroundColor: color,
        width: width === "full" ? "100%" : "fit-content",
      }}
    >
      <img className={styles.avatar} src={imgSrc} />
      <div>{children}</div>
    </article>
  );
};
