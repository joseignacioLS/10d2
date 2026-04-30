import { useState } from "react";
import type { Annotation } from "../assets/bbdd";
import { Paragraph } from "./Paragraph";
import { Button } from "./Button";

import styles from "./TextEntrySection.module.css"

type Props = {
    text: string;
    annotations: Annotation[];
    selectedSentence: string | undefined;
    handleSelectSentence: ({ id, text }: { id: string, text: string }) => void;
}

export const TextEntrySection: React.FC<Props> = ({ text, annotations, selectedSentence, handleSelectSentence }) => {


    const [showAnnotations, setShowAnnotations] = useState<boolean>(true);


    const handleToggleAnnotations = () => {
        setShowAnnotations(v => !v)
    }
    return <section onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
    }}>
        {text.replace(/(\/(?:p|h1|h2|h3)>)(<)/g, "$1\n$2").split("\n").map((line, lineIndex) => {
            if (line.startsWith("<h3>")) {
                return <h3 key={lineIndex}>
                    {line.replaceAll(/<\/?[^>]+>/g, "")}
                </h3>
            } if (line.startsWith("<p>")) {
                return <Paragraph
                    key={lineIndex}
                    lineIndex={lineIndex}
                    plainText={line.substring(3, line.length - 4)}
                    annotations={annotations}
                    selectedSentence={selectedSentence}
                    handleSelectSentence={handleSelectSentence}
                    showAnnotations={showAnnotations}
                ></Paragraph>
            }
            return null
        })}
        <Button className={styles.showAnnotationsButton} onClick={handleToggleAnnotations}>
            <img src={showAnnotations ? "/eye.svg" : "/eye-closed.svg"} />
        </Button>
    </section>
}