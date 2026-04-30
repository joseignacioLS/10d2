import { useEffect, useRef, useState } from "react";
import { Characters } from "../assets/bbdd";
import { Annotations } from "./Annotations";

import styles from "./Sentence.module.css"
import type { Annotation } from "../types/ttrpg";

type Props = {
    id: string;
    handleSelectSentence: ({ id, text }: { id: string, text: string }) => void;
    content: string;
    annotations?: Annotation[];
    isSelected: boolean;
    showAnnotations: boolean;
    toggleVisibleSentence: (id: string, visible: boolean) => void

}

export const Sentence: React.FC<Props> = ({
    id,
    handleSelectSentence,
    content,
    annotations = [],
    isSelected,
    showAnnotations,
    toggleVisibleSentence
}) => {

    const [inScreen, setInScreen] = useState(true);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                toggleVisibleSentence(id, entry.isIntersecting)
            });
        }, {
            root: null,
            threshold: .1
        });

        observer.observe(ref.current!);

        return () => {
            observer.disconnect();
        }
    }, [])

    return <>
        <span
            ref={ref}
            className={`${styles.sessionSummarySentence} ${isSelected ? styles.selected : ""} ${annotations.length > 0 ? styles.annotated : ""}`}
            onClick={() => { handleSelectSentence({ id, text: content }) }}
            dangerouslySetInnerHTML={{
                __html: content
            }}>
        </span >
        {annotations.length > 0 && <Annotations annotations={annotations} showAnnotations={showAnnotations && inScreen} />}
    </>
}