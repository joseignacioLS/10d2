"use client";

import { getSession } from "@/src/api/ttrpg";
import { Backdrop } from "@/src/components/Core/Backdrop";
import { Button } from "@/src/components/Core/Button";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { CommentSection } from "@/src/components/TTRPG/CommentSection";
import { TextEntrySection } from "@/src/components/TTRPG/TextEntrySection";
import { useFetchData } from "@/src/hooks/useFetchData";
import { type Session as TSession } from "@/src/types/ttrpg";
import type React from "react";
import { useState } from "react";
import styles from "./Session.module.css";

type Props = {
  sessionId: TSession["id"];
};

export const Session: React.FC<Props> = ({ sessionId }) => {
  const {
    data: session,
    loading,
    error,
  } = useFetchData(getSession, [sessionId]);

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
  if (loading) {
    return "Cargando...";
  }

  if (error !== null) {
    return "Ha habido un error";
  }

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
        title={session.title || ""}
        crumbs={[
          {
            name: session.campaign?.name || "",
            href: `/campaigns/${session.campaign?.id}`,
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
          <CommentSection comments={session.summary.comments || []} />
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
