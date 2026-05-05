import { Sentence } from "@/src/components/TTRPG/Sentence";
import type { Annotation } from "@/src/types/ttrpg";

type Props = {
  lineIndex: number;
  plainText: string;
  annotations: Annotation[];
  selectedSentence: number[] | undefined;
  handleSelectSentence: ({
    position,
    text,
  }: {
    position: number[];
    text: string;
  }) => void;
};

export const Paragraph: React.FC<Props> = ({
  lineIndex,
  plainText,
  annotations,
  selectedSentence,
  handleSelectSentence,
}) => {
  const sentences = plainText.replaceAll(/([\.\?\!] )/g, "$1\n").split("\n");
  return (
    <div key={lineIndex}>
      {" "}
      {sentences.map((sentence, sentenceIndex) => {
        return (
          <Sentence
            key={sentenceIndex}
            id={`${lineIndex}-${sentenceIndex}`}
            handleSelectSentence={handleSelectSentence}
            content={sentence}
            annotations={annotations.filter(
              ({ position }) =>
                position[0] === lineIndex && position[1] === sentenceIndex,
            )}
            isSelected={
              selectedSentence?.[0] === lineIndex &&
              selectedSentence?.[1] === sentenceIndex
            }
          />
        );
      })}
    </div>
  );
};
