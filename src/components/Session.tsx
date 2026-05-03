"use client";

import type React from "react";
import { useState } from "react";
import { type Session as TSession } from "../types/ttrpg";
import { CommentSection } from "./CommentSection";
import { Button } from "./Core/Button";
import { TextEntrySection } from "./TextEntrySection";

import { getSession } from "../api/ttrpg";
import { useFetchData } from "../hooks/useFetchData";
import { Backdrop } from "./Core/Backdrop";
import { CrumbsHeader } from "./Core/CrumbsHeader";
import styles from "./Session.module.css";

type Props = {
  sessionId: TSession["id"];
};

export const Session: React.FC<Props> = ({ sessionId }) => {
  const { data: session } = useFetchData(getSession, [sessionId]);

  const [userInput, setUserInput] = useState<string>("");
  const [selectedSentence, setSelectedSentence] = useState<{
    text: string;
    id: string;
  }>({
    text: "",
    id: "",
  });

  const handleAnnotate = (text: string, id: string) => {
    // setSession((prev) => {
    //   if (!prev) return prev;
    //   return {
    //     ...prev,
    //     summary: {
    //       ...prev.summary,
    //       annotations: [
    //         ...prev.summary.annotations,
    //         {
    //           id,
    //           character: "0-0",
    //           text,
    //         },
    //       ],
    //     },
    //   };
    // });
    setUserInput("");
    setSelectedSentence({
      text: "",
      id: "",
    });
  };

  return (
    <div
      className={styles.sessionSummary}
      onClick={() =>
        setSelectedSentence({
          text: "",
          id: "",
        })
      }
    >
      <CrumbsHeader
        title={session?.title || ""}
        crumbs={[
          {
            name: session?.campaign?.name || "",
            href: `/campaigns/${session?.campaign?.id}`,
          },
        ]}
      />
      <div className="scrolleableBlock">
        {session && (
          <TextEntrySection
            text={session.summary.text}
            annotations={session.summary.annotations}
            selectedSentence={selectedSentence.id}
            handleSelectSentence={setSelectedSentence}
          />
        )}
        {session && (
          <CommentSection comments={session?.summary.comments || []} />
        )}
      </div>
      {selectedSentence.id && <Backdrop />}
      <section
        className={`${styles.sessionAnnotationInputWrapper} ${selectedSentence.id ? styles.enabled : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {selectedSentence.id && <p>{selectedSentence.text}</p>}
        <textarea
          disabled={selectedSentence === undefined}
          value={userInput}
          onInput={(e) => {
            setUserInput(e.currentTarget.value);
          }}
        ></textarea>
        <div className={styles.controls}>
          <Button
            onClick={() =>
              setSelectedSentence({
                text: "",
                id: "",
              })
            }
          >
            Cerrar
          </Button>
          <Button
            onClick={() => {
              if (!selectedSentence) {
                return;
              }
              handleAnnotate(userInput, selectedSentence.id);
            }}
          >
            Guardar
          </Button>
        </div>
      </section>
    </div>
  );
};
