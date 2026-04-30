"use client";

import { useState } from "react";
import { Annotations } from "./Annotations";

import type { Annotation } from "../types/ttrpg";
import styles from "./Sentence.module.css";

type Props = {
    id: string;
    handleSelectSentence: ({ id, text }: { id: string, text: string }) => void;
    content: string;
    annotations?: Annotation[];
    isSelected: boolean;
}

export const Sentence: React.FC<Props> = ({
    id,
    handleSelectSentence,
    content,
    annotations = [],
    isSelected,

}) => {
    const [showAnnotations, setShowAnnotations] = useState(false);
    return <>
        <span
            className={`${styles.sessionSummarySentence} ${isSelected ? styles.selected : ""} ${annotations.length > 0 ? styles.annotated : ""}`}
            onClick={() => {
                // handleSelectSentence({ id, text: content });
                setShowAnnotations(v => !v)
            }}
            dangerouslySetInnerHTML={{
                __html: content
            }}>
        </span >
        {annotations.length > 0 && <Annotations annotations={annotations} showAnnotations={showAnnotations} />}
    </>
}