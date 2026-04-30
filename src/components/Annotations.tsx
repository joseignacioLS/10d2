import { Characters } from "../assets/bbdd";
import type { Annotation as TAnnotation } from "../types/ttrpg";
import { Annotation } from "./Annotation";

import styles from "./Annotations.module.css";

type Props = { annotations: TAnnotation[], showAnnotations: boolean }

export const Annotations: React.FC<Props> = ({ annotations, showAnnotations }) => {
    return <span className={`${styles.annotationsWrapper} ${showAnnotations ? styles.show : ""}`}>
        {
            annotations.map(({ text, character }, index) => {
                const char = Characters.find((c) => c.id === character);
                return <Annotation text={text} character={char} />
            })
        }
    </span>
}