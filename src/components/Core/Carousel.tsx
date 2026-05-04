import { ReactElement, ReactNode } from "react";
import styles from "./Carousel.module.css";

type Props = { srcs: string[] };

export const Carousel: React.FC<Props> = ({ srcs }) => {
  return (
    <div className={styles.carouselWrapper}>
      {srcs.map((src, i) => {
        return <img key={i} src={src} />;
      })}
    </div>
  );
};
