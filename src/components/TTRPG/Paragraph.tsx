import { Sentence } from "@/src/components/TTRPG/Sentence";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import type { Annotation } from "@/src/types/ttrpg";
import { useContext } from "react";

import styles from "./Paragraph.module.css";

type Props = {
  lineIndex: number;
  plainText: string;
  annotations: Annotation[];
};

export const Paragraph: React.FC<Props> = ({
  lineIndex,
  plainText,
  annotations,
}) => {
  const { selectedSentence } = useContext(TTRPGSessionContext);
  const sentences = plainText.replaceAll(/([\.\?\!] )/g, "$1\n").split("\n");
  return (
    <div key={lineIndex} className={styles.paragraph}>
      {" "}
      {sentences.map((sentence, sentenceIndex) => {
        return (
          <Sentence
            key={sentenceIndex}
            id={`${lineIndex}-${sentenceIndex}`}
            content={sentence}
            annotations={annotations.filter(
              ({ position }) =>
                position[0] === lineIndex && position[1] === sentenceIndex,
            )}
            isSelected={
              selectedSentence?.position[0] === lineIndex &&
              selectedSentence?.position[1] === sentenceIndex
            }
          />
        );
      })}
    </div>
  );
};
