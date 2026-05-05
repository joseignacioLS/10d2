"use client";

import { annotateSentence, getSession } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { CommentSection } from "@/src/components/TTRPG/CommentSection";
import { TextEntrySection } from "@/src/components/TTRPG/TextEntrySection";
import { useFetchData } from "@/src/hooks/useFetchData";
import { type Session as TSession } from "@/src/types/ttrpg";
import type React from "react";
import { useState } from "react";
import { Input } from "../Core/Input";
import { Modal } from "../Core/Modal";
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
    position: number[];
  }>({
    text: "",
    position: [0, 0],
  });

  const handleAnnotate = async (text: string, position: number[]) => {
    const { error } = await annotateSentence(sessionId, position, text, "0");
    if (error) {
      return;
    }
    setUserInput("");
    setSelectedSentence({
      text: "",
      position: [0, 0],
    });
  };

  if (loading) {
    return "Cargando...";
  }

  if (error !== null) {
    return "Ha habido un error";
  }

  return (
    <div className={styles.sessionSummary}>
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
            selectedSentence={selectedSentence.position}
            handleSelectSentence={setSelectedSentence}
          />
        )}
        {session && (
          <CommentSection comments={session.summary.comments || []} />
        )}
      </div>
      {selectedSentence.text && (
        <Modal
          onClose={() => {
            setSelectedSentence({
              position: [0, 0],
              text: "",
            });
          }}
        >
          <>
            {selectedSentence.text && <p>{selectedSentence.text}</p>}
            <Input
              id="annotation"
              name="annotation"
              value={userInput}
              placeholder="Escribe aquí"
              max={256}
              onChange={(_, value) => {
                setUserInput(value);
              }}
            />
            <div className={styles.controls}>
              <Button
                onClick={() => {
                  if (!selectedSentence) {
                    return;
                  }
                  handleAnnotate(userInput, selectedSentence.position);
                }}
              >
                Guardar
              </Button>
            </div>
          </>
        </Modal>
      )}
    </div>
  );
};
