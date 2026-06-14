import { Annotation } from "@/src/components/TTRPG/Annotation";
import type { Annotation as TAnnotation } from "@/src/types/ttrpg";

import styles from "./Annotations.module.css";

type Props = { annotations: TAnnotation[]; showAnnotations: boolean };

export const Annotations: React.FC<Props> = ({
  annotations,
  showAnnotations,
}) => {
  return (
    <span
      className={`${styles.annotationsWrapper} ${showAnnotations ? styles.show : ""}`}
    >
      {annotations.map(({ text, character }, index) => {
        return <Annotation key={index} text={text} author={character} />;
      })}
    </span>
  );
};
