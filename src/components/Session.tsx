import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Campaigns, Characters, Groups, Sessions, } from "../assets/bbdd";
import { type Session as TSession } from "../types/ttrpg";
import { Button } from "./Core/Button";
import { CommentSection } from "./CommentSection";
import { TextEntrySection } from "./TextEntrySection";

import styles from "./Session.module.css"
import { CrumbsHeader } from "./Core/CrumbsHeader";
import { Backdrop } from "./Core/Backdrop";
import { Annotation } from "./Annotation";

type Props = {
    sessionId: TSession["id"];
}

const fetchSession = async (sessionId: TSession["id"]): Promise<TSession | undefined> => {
    const session = Sessions.find(({ id }) => id === sessionId)
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
    const [visibleSentences, setVisibleSentences] = useState<string[]>([])

    const peekRef = useRef<HTMLElement>(null)

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

    const toggleVisibleSentence = (id: string, visible: boolean) => {
        setVisibleSentences(prev => {
            const newState = structuredClone(prev);
            if (visible) {
                if (!newState.includes(id)) {
                    newState.push(id)
                }
                return newState
            }
            else {
                return newState.filter(v => v !== id)
            }

        })
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
        setSelectedSentence({
            text: "",
            id: ""
        });
    }

    const group = Groups.find(({ id }) => id === sessionId.split("-")[0]);
    const campaign = Campaigns.find((c) => c.id === sessionId.split("-").slice(0, 2).join("-"));

    return <div className={styles.sessionSummary} onClick={() => setSelectedSentence({
        text: "",
        id: ""
    })}>
        <CrumbsHeader
            title={session?.title || ""}
            crumbs={[
                {
                    name: group?.name || "",
                    href: `/groups/${group?.id}`
                },
                {
                    name: campaign?.name || "",
                    href: `/campaigns/${campaign?.id}`
                }
            ]} />
        <section className={styles.sessionBody} style={{
            paddingBottom: peekRef?.current?.clientHeight + "px"
        }}>
            {session && <TextEntrySection
                text={session.summary.text}
                annotations={[]}
                selectedSentence={selectedSentence.id}
                handleSelectSentence={setSelectedSentence}
                toggleVisibleSentence={toggleVisibleSentence}
            />}
            {session && <CommentSection comments={session?.summary.comments || []} />}
        </section>
        <section ref={peekRef} className={styles.peekWrapper}>
            {session?.summary.annotations
                .map((annotation) => {
                    const character = Characters.find(({ id }) => id === annotation.character);
                    return <Annotation key={annotation.id} text={annotation.text} character={character} />
                })}
        </section>
        {selectedSentence.id && <Backdrop />}
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
