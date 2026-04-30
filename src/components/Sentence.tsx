import { useEffect, useRef, useState } from "react";
import { Characters, type Annotation } from "../assets/bbdd";
import { Annotations } from "./Annotations";

import styles from "./Sentence.module.css"

type Props = {
    id: string;
    handleSelectSentence: ({ id, text }: { id: string, text: string }) => void;
    content: string;
    annotations?: Annotation[];
    isSelected: boolean;
    isLast: boolean;
    showAnnotations: boolean;

}

export const Sentence: React.FC<Props> = ({
    id,
    handleSelectSentence,
    content,
    annotations = [],
    isSelected,
    isLast,
    showAnnotations
}) => {

    const [inScreen, setInScreen] = useState(true);
    const ref = useRef<HTMLSpanElement>(null);

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 setInScreen(true);
    //             } else {
    //                 setInScreen(false);
    //             }
    //         });
    //     }, {
    //         root: null,
    //         threshold: 1
    //     });

    //     observer.observe(ref.current!);

    //     return () => {
    //         observer.disconnect();
    //     }
    // }, [])

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