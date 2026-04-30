import type { Character } from "../types/ttrpg";
import styles from "./Annotation.module.css"

type Props = {
    text: string;
    character?: Character
}

export const Annotation: React.FC<Props> = ({ text, character = { color: "#ddd", name: "Unknown" } }) => {
    return <article
        className={styles.annotation}
        style={{
            backgroundColor: character?.color
        }}
    >
        <img className={styles.annotationAvatar} src="/cat.svg" />
        <span>
            <span>
                {text}
            </span>
            <span><i> - {character?.name}</i></span>
        </span>
    </article>
}