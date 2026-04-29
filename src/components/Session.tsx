import type React from "react";
import { bbdd, type Session as TSession } from "../assets/bbdd";
import { useEffect, useState } from "react";
import { Paragraph } from "./Paragraph";
import { set } from "astro:schema";

type Props = {
    sessionId: TSession["id"];
}

const fetchSession = async (sessionId: TSession["id"]): Promise<TSession | undefined> => {
    const groupId = sessionId.split("-")[0];
    const campaingId = groupId + "-" + sessionId.split("-")[1]

    const session = bbdd.find(({ id }) => id === groupId)?.campaings.find(({ id }) => id === campaingId)?.sessions.find(({ id }) => id === sessionId)
    return session
}

export const Session: React.FC<Props> = ({ sessionId }) => {
    const [session, setSession] = useState<TSession>();
    const [userInput, setUserInput] = useState<string>("");
    const [selectedSentence, setSelectedSentence] = useState<string>();
    const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

    useEffect(() => {
        fetchSession(sessionId).then((data) => {
            if (!data) alert("wops");
            setSession(data);
        })
    }, [sessionId])


    const handleToggleAnnotations = () => {
        setShowAnnotations(v => !v)
    }

    const handleAnnotate = (text: string, id: string) => {
        setSession((prev) => {
            if (!prev) return prev
            return {
                ...prev,
                summary: {
                    ...prev.summary,
                    annotations: [
                        ...prev.summary.annotations,
                        {
                            id,
                            character: "0-0",
                            text,
                        }
                    ]
                }
            }
        })
        setUserInput("");
        setSelectedSentence(undefined);
    }


    return <div className={"session-summary"} onClick={() => setSelectedSentence(undefined)}>
        <header>
            <h2>
                {session?.title}
            </h2>
        </header>
        <section onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}>
            {session?.summary.text.replace(/(\/(?:p|h1|h2|h3)>)(<)/g, "$1\n$2").split("\n").map((line, lineIndex) => {
                if (line.startsWith("<h3>")) {
                    return <h3 key={lineIndex}>
                        {line.replaceAll(/<\/?[^>]+>/g, "")}
                    </h3>
                } if (line.startsWith("<p>")) {
                    return <Paragraph
                        key={lineIndex}
                        lineIndex={lineIndex}
                        plainText={line.substring(3, line.length - 4)}
                        annotations={session?.summary.annotations}
                        selectedSentence={selectedSentence}
                        handleSelectSentence={setSelectedSentence}
                        showAnnotations={showAnnotations}
                    ></Paragraph>
                }
                return <></>
            })}
        </section>
        <button className={"show-annotations-button"} onClick={handleToggleAnnotations}>
            <img src={showAnnotations ? "/eye.svg" : "/eye-closed.svg"} />
        </button>
        <section
            className={`session-annotation-input-wrapper ${selectedSentence !== undefined ? "enabled" : ""}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
            <button onClick={() => setSelectedSentence(undefined)}>Cerrar</button>
            <textarea
                disabled={selectedSentence === undefined}
                value={userInput}
                onInput={(e) => {
                    setUserInput(e.currentTarget.value)
                }}></textarea>
            <button onClick={() => {
                if (!selectedSentence) {
                    return
                }
                handleAnnotate(userInput, selectedSentence)
            }}>Guardar</button>
        </section>
    </div>
}
