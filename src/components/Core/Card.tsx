import { ReactElement } from "react";

import styles from "./Card.module.css";

type Props = {
  children: ReactElement;
  mode?: "theme" | "soft" | "hard";
  className?: string;
};

export const Card: React.FC<Props> = ({
  children,
  mode = "theme",
  className,
}) => {
  return (
    <section className={`${styles.card} ${styles[mode]} ${className}`}>
      {children}
    </section>
  );
};
