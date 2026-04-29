import { Characters, type Annotation } from "../assets/bbdd";

type Props = {
    id: string;
    handleSelectSentence: (id: string) => void;
    content: string;
    annotations?: Annotation[];
    isSelected: boolean;
    isLast: boolean;
    showAnnotations: boolean;

}

export const Sentence: React.FC<Props> = ({
    id,
    handleSelectSentence,
    content,
    annotations = [],
    isSelected,
    isLast,
    showAnnotations
}) => {
    return <>
        <span
            className={`session-summary-sentence
            ${isSelected ? "selected" : ""}
            ${annotations.length > 0 ? "annotated" : ""}
            `}
            onClick={() => { handleSelectSentence(id) }}
            dangerouslySetInnerHTML={{
                __html: content + (isLast ? "" : ". ")
            }}>
        </span>
        {annotations?.map(({ text, character }) => {
            const char = Characters.find((c) => c.id === character);
            return <div
                className={`annotation ${showAnnotations ? "show" : ""}`}
                style={{
                    backgroundColor: char?.color
                }}
            >
                <span>
                    {text}

                </span>
                <span><i> - {char?.name}</i></span>
            </div>
        })}
    </>
}