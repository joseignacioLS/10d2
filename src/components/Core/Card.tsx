import { ReactElement } from "react";

import styles from "./Card.module.css";

type Props = { children: ReactElement; mode?: "theme" | "soft" | "hard" };

export const Card: React.FC<Props> = ({ children, mode = "theme" }) => {
  return (
    <section className={`${styles.card} ${styles[mode]}`}>{children}</section>
  );
};
