"use client";

import { Button } from "@/src/components/Core/Button";
import { Annotations } from "@/src/components/TTRPG/Annotations";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import type { Annotation } from "@/src/types/ttrpg";
import { useContext, useState } from "react";
import styles from "./Sentence.module.css";

type Props = {
  id: string;
  content: string;
  annotations?: Annotation[];
  isSelected: boolean;
};

export const Sentence: React.FC<Props> = ({
  id,
  content,
  annotations = [],
  isSelected,
}) => {
  const {
    canAnnotate,
    selectSentence,
    unselectSentence,
    openCreateAnnotationModal,
  } = useContext(TTRPGSessionContext);
  const [showAnnotation, setShowAnnotation] = useState(false);
  return (
    <>
      <span
        className={`${styles.sessionSummarySentence} ${canAnnotate ? styles.canAnnotate : ""} ${isSelected ? styles.selected : ""} ${annotations.length > 0 ? styles.annotated : ""}`}
      >
        <span
          onClick={() => {
            if (annotations.length > 0) {
              if (!isSelected) {
                setShowAnnotation(true);
              } else {
                setShowAnnotation((v) => !v);
              }
            }
            if (annotations.length < 1 && !canAnnotate) return;
            if (isSelected) {
              unselectSentence();
              return;
            }
            selectSentence({
              text: content,
              position: [Number(id.split("-")[0]), Number(id.split("-")[1])],
            });
          }}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></span>
        <span className={styles.annotateBtnWrapper}>
          {isSelected && canAnnotate && (
            <Button
              className={styles.annotateBtn}
              onClick={(e) => {
                if (!canAnnotate) return;
                e.stopPropagation();
                e.preventDefault();
                openCreateAnnotationModal();
              }}
            >
              <img src="/feather.svg" />
            </Button>
          )}
        </span>
      </span>
      {annotations.length > 0 && (
        <Annotations
          annotations={annotations}
          showAnnotations={showAnnotation}
        />
      )}
    </>
  );
};
