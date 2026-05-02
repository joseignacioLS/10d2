"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Sessions } from "../assets/bbdd";
import { type Session as TSession } from "../types/ttrpg";
import { CommentSection } from "./CommentSection";
import { Button } from "./Core/Button";
import { TextEntrySection } from "./TextEntrySection";

import { useGameData } from "../hooks/useGameData";
import { Backdrop } from "./Core/Backdrop";
import { CrumbsHeader } from "./Core/CrumbsHeader";
import styles from "./Session.module.css";

type Props = {
  sessionId: TSession["id"];
};

const fetchSession = async (
  sessionId: TSession["id"],
): Promise<TSession | undefined> => {
  const session = Sessions.find(({ id }) => id === sessionId);
  return session;
};

export const Session: React.FC<Props> = ({ sessionId }) => {
  const { session, campaign, group } = useGameData({ sessionId });

  const [userInput, setUserInput] = useState<string>("");
  const [selectedSentence, setSelectedSentence] = useState<{
    text: string;
    id: string;
  }>({
    text: "",
    id: "",
  });

  useEffect(() => {
    fetchSession(sessionId)
      .then((data) => {
        if (!data) alert("wops");
        // setSession(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sessionId]);

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
            name: group?.name || "",
            href: `/groups/${group?.id}`,
          },
          {
            name: campaign?.name || "",
            href: `/campaigns/${campaign?.id}`,
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
