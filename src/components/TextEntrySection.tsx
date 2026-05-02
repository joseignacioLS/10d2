import type { Annotation } from "../types/ttrpg";
import { Paragraph } from "./Paragraph";

type Props = {
  text: string;
  annotations: Annotation[];
  selectedSentence: string | undefined;
  handleSelectSentence: ({ id, text }: { id: string; text: string }) => void;
};

export const TextEntrySection: React.FC<Props> = ({
  text,
  annotations,
  selectedSentence,
  handleSelectSentence,
}) => {
  return (
    <section
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {text
        .replace(/(\/(?:p|h1|h2|h3)>)(<)/g, "$1\n$2")
        .split("\n")
        .map((line, lineIndex) => {
          if (line.startsWith("<h3>")) {
            return (
              <h3 key={lineIndex}>{line.replaceAll(/<\/?[^>]+>/g, "")}</h3>
            );
          }
          if (line.startsWith("<p>")) {
            return (
              <Paragraph
                key={lineIndex}
                lineIndex={lineIndex}
                plainText={line.substring(3, line.length - 4)}
                annotations={annotations}
                selectedSentence={selectedSentence}
                handleSelectSentence={handleSelectSentence}
              ></Paragraph>
            );
          }
          return null;
        })}
    </section>
  );
};
