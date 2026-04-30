import { Characters } from "../assets/bbdd";
import type { Annotation } from "../types/ttrpg";

import styles from "./Annotations.module.css";

type Props = { annotations: Annotation[], showAnnotations: boolean }

export const Annotations: React.FC<Props> = ({ annotations, showAnnotations }) => {
    return <span className={`${styles.annotationsWrapper} ${showAnnotations ? styles.show : ""}`}>
        {
            annotations.map(({ text, character }, index) => {
                const char = Characters.find((c) => c.id === character);
                return <span
                    key={index}
                    className={styles.annotation}
                    style={{
                        backgroundColor: char?.color
                    }}
                >
                    <img className={styles.annotationAvatar} src="/cat.svg" />
                    <span>
                        <span>
                            {text}
                        </span>
                        <span><i> - {char?.name}</i></span>
                    </span>
                </span>
            })
        }
    </span>
}