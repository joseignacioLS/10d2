import { Characters, type Annotation } from "../assets/bbdd";
import { Annotations } from "./Annotations";

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
        {annotations.length > 0 && <Annotations annotations={annotations} showAnnotations={showAnnotations} />}
    </>
}