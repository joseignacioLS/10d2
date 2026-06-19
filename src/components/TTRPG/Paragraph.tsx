import { Sentence } from "@/src/components/TTRPG/Sentence";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { useContext } from "react";

import styles from "./Paragraph.module.css";

type Props = {
  lineIndex: number;
  plainText: string;
};

export const Paragraph: React.FC<Props> = ({ lineIndex, plainText }) => {
  const { selectedSentence, session } = useContext(TTRPGSessionContext);
  const sentences = plainText.replaceAll(/([\.\?\!] )/g, "$1\n").split("\n");
  return (
    <div key={lineIndex} className={styles.paragraph}>
      {" "}
      {sentences.map((sentence, sentenceIndex) => {
        const isSelected =
          selectedSentence?.position[0] === lineIndex &&
          selectedSentence?.position[1] === sentenceIndex;
        return (
          <Sentence
            key={sentenceIndex}
            id={`${lineIndex}-${sentenceIndex}`}
            content={sentence}
            annotations={session?.annotations.filter(
              ({ position }) =>
                position.y === lineIndex && position.x === sentenceIndex,
            )}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};
