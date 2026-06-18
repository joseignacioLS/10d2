"use client";

import { annotateSentence } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import { TextEntrySection } from "@/src/components/TTRPG/TextEntrySection";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { SessionDetail } from "@/src/types/ttrpg";
import type React from "react";
import { useContext, useEffect } from "react";

import { useHandleInput } from "@/src/hooks/useHandleInput";
import styles from "./Session.module.css";
import { UserContext } from "@/src/store/user";

type Props = {
  session: SessionDetail;
  refetchSession: () => void;
};

export const Session: React.FC<Props> = ({ session, refetchSession }) => {
  const { input, handleInput, resetInput } = useHandleInput({ annotation: "" });

  const { userData } = useContext(UserContext);

  const {
    selectedSentence,
    showCreateAnnotationModal,
    closeCreateAnnotationModal,
    canAnnotate,
    updateAnnotatePermission,
  } = useContext(TTRPGSessionContext);

  const handleAnnotate = useWrapFnWithToast(
    async (text: string, position: number[]) => {
      if (!canAnnotate) throw "No tienes un personaje asignado en esta campaña";
      const { error } = await annotateSentence(session.id, position, text);
      if (error) {
        throw "Ha habido un error anotando la frase";
      }
      resetInput();
      closeCreateAnnotationModal();
      refetchSession();
      return "Texto anotado";
    },
  );

  useEffect(() => {
    updateAnnotatePermission(
      ["player", "GM"].includes(userData.permissions[session.campaign.id]),
    );
  }, [session.campaign.id, userData.permissions]);

  return (
    <div className={styles.sessionSummary}>
      <CrumbsHeader
        title={session.title || ""}
        crumbs={[
          {
            name: session.campaign?.short || "",
            href: `/campaigns/${session.campaign?.id}`,
          },
        ]}
      />
      <p>
        {session.author.name} //{" "}
        {session.date.toLocaleString("es", {
          dateStyle: "full",
        })}
      </p>
      <div className="scrolleableBlock">
        {session && (
          <TextEntrySection
            text={session.summary}
            annotations={session.annotations}
          />
        )}
      </div>
      <Modal
        isOpen={showCreateAnnotationModal}
        onClose={() => {
          closeCreateAnnotationModal();
        }}
      >
        <>
          {selectedSentence && <p>{selectedSentence.text}</p>}
          <Input
            id="annotation"
            name="annotation"
            value={input.annotation}
            placeholder="Escribe aquí"
            max={256}
            onChange={handleInput}
          />
          <div className={styles.controls}>
            <Button
              onClick={() => {
                if (!selectedSentence) {
                  return;
                }
                handleAnnotate(input.annotation, selectedSentence.position);
              }}
            >
              Guardar
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
};
