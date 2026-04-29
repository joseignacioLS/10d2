import type { Annotation } from "../assets/bbdd";
import { Sentence } from "./Sentence";

type Props = {
    lineIndex: number;
    plainText: string;
    annotations: Annotation[],
    selectedSentence: string | undefined,
    handleSelectSentence: (id: string) => void;
    showAnnotations: boolean;
}

export const Paragraph: React.FC<Props> = ({
    lineIndex,
    plainText,
    annotations,
    selectedSentence,
    handleSelectSentence,
    showAnnotations
}) => {
    return <p key={lineIndex}> {
        plainText.split(". ")
            .map((sentence, sentenceIndex) => {
                const isLast = sentenceIndex === plainText.split(". ").length - 1;
                const sentenceId = `${lineIndex}-${sentenceIndex}`;
                const annotation = annotations.filter(({ id }) => id === sentenceId)
                return <Sentence
                    key={sentenceIndex}
                    id={`${lineIndex}-${sentenceIndex}`}
                    handleSelectSentence={handleSelectSentence}
                    content={sentence}
                    annotations={annotation}
                    isSelected={selectedSentence === sentenceId}
                    isLast={isLast}
                    showAnnotations={showAnnotations}
                />
            })
    }</p >
}