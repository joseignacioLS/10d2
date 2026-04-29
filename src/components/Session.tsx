import type React from "react";
import { useEffect, useState } from "react";
import { bbdd, type Session as TSession } from "../assets/bbdd";
import { Button } from "./Button";
import { CommentSection } from "./CommentSection";
import { TextEntrySection } from "./TextEntrySection";

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

    useEffect(() => {
        fetchSession(sessionId).then((data) => {
            if (!data) alert("wops");
            setSession(data);
        })
    }, [sessionId])



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
        {session && <TextEntrySection
            text={session.summary.text}
            annotations={session.summary.annotations}
            selectedSentence={selectedSentence}
            setSelectedSentence={setSelectedSentence}
        />}
        {session && <CommentSection comments={session?.summary.comments || []} />}

        <section
            className={`session-annotation-input-wrapper ${selectedSentence !== undefined ? "enabled" : ""}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
            <textarea
                disabled={selectedSentence === undefined}
                value={userInput}
                onInput={(e) => {
                    setUserInput(e.currentTarget.value)
                }}></textarea>
            <div className="controls" >
                <Button onClick={() => setSelectedSentence(undefined)}>Cerrar</Button>
                <Button onClick={() => {
                    if (!selectedSentence) {
                        return
                    }
                    handleAnnotate(userInput, selectedSentence)
                }}>Guardar</Button>
            </div>
        </section>
    </div>
}
