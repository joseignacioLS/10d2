"use client";

import { Annotations } from "@/src/components/TTRPG/Annotations";
import type { Annotation } from "@/src/types/ttrpg";
import { useState } from "react";

import styles from "./Sentence.module.css";

type Props = {
  id: string;
  handleSelectSentence: ({
    position,
    text,
  }: {
    position: number[];
    text: string;
  }) => void;
  content: string;
  annotations?: Annotation[];
  isSelected: boolean;
};

export const Sentence: React.FC<Props> = ({
  id,
  handleSelectSentence,
  content,
  annotations = [],
  isSelected,
}) => {
  const [showAnnotations, setShowAnnotations] = useState(false);
  return (
    <>
      <span
        className={`${styles.sessionSummarySentence} ${isSelected ? styles.selected : ""} ${annotations.length > 0 ? styles.annotated : ""}`}
        onClick={() => {
          handleSelectSentence({
            position: id.split("-").map(Number),
            text: content,
          });
          setShowAnnotations((v) => !v);
        }}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></span>
      {annotations.length > 0 && (
        <Annotations
          annotations={annotations}
          showAnnotations={showAnnotations}
        />
      )}
    </>
  );
};
