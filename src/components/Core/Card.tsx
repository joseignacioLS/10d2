import { ReactElement } from "react";

import styles from "./Card.module.css";

type Props = { children: ReactElement };

export const Card: React.FC<Props> = ({ children }) => {
  return <section className={styles.card}>{children}</section>;
};
