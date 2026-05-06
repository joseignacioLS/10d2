import { Paragraph } from "@/src/components/TTRPG/Paragraph";
import type { Annotation } from "@/src/types/ttrpg";

type Props = {
  text: string;
  annotations: Annotation[];
};

export const TextEntrySection: React.FC<Props> = ({ text, annotations }) => {
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
              ></Paragraph>
            );
          }
          return null;
        })}
    </section>
  );
};
