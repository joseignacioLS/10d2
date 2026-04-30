import type React from "react";
import { useEffect, useState } from "react";
import { campaigns, type Session as TSession } from "../assets/bbdd";
import { Button } from "./Button";
import { CommentSection } from "./CommentSection";
import { TextEntrySection } from "./TextEntrySection";

import styles from "./Session.module.css"

type Props = {
    sessionId: TSession["id"];
}

const fetchSession = async (sessionId: TSession["id"]): Promise<TSession | undefined> => {
    const groupId = sessionId.split("-")[0];
    const campaignId = groupId + "-" + sessionId.split("-")[1]

    const session = campaigns.find(({ id }) => id === campaignId)?.sessions.find(({ id }) => id === sessionId)
    return session
}

export const Session: React.FC<Props> = ({ sessionId }) => {
    const [session, setSession] = useState<TSession>();
    const [userInput, setUserInput] = useState<string>("");
    const [selectedSentence, setSelectedSentence] = useState<{
        text: string;
        id: string;
    }>({
        text: "",
        id: ""
    });

    useEffect(() => {
        fetchSession(sessionId)
            .then((data) => {
                if (!data) alert("wops");
                setSession(data);
            })
            .catch(err => {
                console.log(err)
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
        setSelectedSentence({
            text: "",
            id: ""
        });
    }

    const campaign = campaigns.find((c) => c.id === sessionId.split("-").slice(0, 2).join("-"));
    console.log({ campaign })

    return <div className={styles.sessionSummary} onClick={() => setSelectedSentence({
        text: "",
        id: ""
    })}>
        <header className={styles.sessionSummaryHeader}>
            <h2>
                <a href={`/campaigns/${campaign?.id}`}>{campaign?.name}</a>
                <span>{session?.title}</span>
            </h2>
        </header>
        {session && <TextEntrySection
            text={session.summary.text}
            annotations={session.summary.annotations}
            selectedSentence={selectedSentence.id}
            handleSelectSentence={setSelectedSentence}
        />}
        {session && <CommentSection comments={session?.summary.comments || []} />}

        {selectedSentence.id && <div className={styles.backdrop} />}
        <section
            className={`${styles.sessionAnnotationInputWrapper} ${selectedSentence.id ? styles.enabled : ""}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}>
            {selectedSentence.id && <p>{selectedSentence.text}</p>}
            <textarea
                disabled={selectedSentence === undefined}
                value={userInput}
                onInput={(e) => {
                    setUserInput(e.currentTarget.value)
                }}></textarea>
            <div className={styles.controls} >
                <Button onClick={() => setSelectedSentence({
                    text: "",
                    id: ""
                })}>Cerrar</Button>
                <Button onClick={() => {
                    if (!selectedSentence) {
                        return
                    }
                    handleAnnotate(userInput, selectedSentence.id)
                }}>Guardar</Button>
            </div>
        </section>
    </div >
}
