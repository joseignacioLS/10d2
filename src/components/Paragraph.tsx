import type { Annotation } from "../types/ttrpg";
import { Sentence } from "./Sentence";

type Props = {
    lineIndex: number;
    plainText: string;
    annotations: Annotation[],
    selectedSentence: string | undefined,
    handleSelectSentence: ({ id, text }: { id: string, text: string }) => void;
    showAnnotations: boolean;
    toggleVisibleSentence: (id: string, visible: boolean) => void;
}

export const Paragraph: React.FC<Props> = ({
    lineIndex,
    plainText,
    annotations,
    selectedSentence,
    handleSelectSentence,
    showAnnotations,
    toggleVisibleSentence
}) => {
    const sentences = plainText
        .replaceAll(/([\.\?\!] )/g, "$1\n")
        .split("\n")
    return <p key={lineIndex}> {

        sentences.map((sentence, sentenceIndex) => {
            const sentenceId = `${lineIndex}-${sentenceIndex}`;
            return <Sentence
                key={sentenceIndex}
                id={`${lineIndex}-${sentenceIndex}`}
                handleSelectSentence={handleSelectSentence}
                content={sentence}
                annotations={annotations.filter(({ id }) => id === sentenceId)}
                isSelected={selectedSentence === sentenceId}
                showAnnotations={showAnnotations}
                toggleVisibleSentence={toggleVisibleSentence}
            />
        })
    }</p >
}