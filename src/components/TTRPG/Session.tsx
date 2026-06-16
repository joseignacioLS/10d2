"use client";

import { annotateSentence, getSession } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { CrumbsHeader } from "@/src/components/Core/CrumbsHeader";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import { TextEntrySection } from "@/src/components/TTRPG/TextEntrySection";
import { useFetchData } from "@/src/hooks/useFetchData";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { type Session as TSession } from "@/src/types/ttrpg";
import type React from "react";
import { useContext, useEffect } from "react";

import { useHandleInput } from "@/src/hooks/useHandleInput";
import { ToastContext } from "@/src/store/toast";
import { useRouter } from "next/navigation";
import { Temporal } from "temporal-polyfill";
import { Spinner } from "../Core/Spinner";
import styles from "./Session.module.css";

type Props = {
  sessionId: TSession["id"];
};

export const Session: React.FC<Props> = ({ sessionId }) => {
  const {
    data: session,
    loading,
    error,
    refetch,
  } = useFetchData(getSession, [sessionId], undefined, (data) => {
    return {
      ...data,
      date: Temporal.PlainDate.from(data.date),
    };
  });

  const { createToast } = useContext(ToastContext);

  const router = useRouter();

  const { input, handleInput, resetInput } = useHandleInput({ annotation: "" });

  const {
    selectedSentence,
    showCreateAnnotationModal,
    closeCreateAnnotationModal,
    canAnnotate,
    checkAnnotationPermission,
  } = useContext(TTRPGSessionContext);

  const handleAnnotate = useWrapFnWithToast(
    async (text: string, position: number[]) => {
      if (!canAnnotate) throw "No tienes un personaje asignado en esta campaña";
      const { error } = await annotateSentence(sessionId, position, text);
      if (error) {
        throw "Ha habido un error anotando la frase";
      }
      resetInput();
      closeCreateAnnotationModal();
      refetch();
      return "Texto anotado";
    },
  );

  useEffect(() => {
    if (!session?.campaign.id) return;
    checkAnnotationPermission(session?.campaign.id);
  }, [session?.campaign?.id]);

  if (loading) {
    return <Spinner />;
  }

  if (error !== null) {
    createToast(error, "error");
    router.push("/");
    return null;
  }

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
        {session.author} //{" "}
        {session.date.toLocaleString("es", {
          dateStyle: "full",
        })}
      </p>
      <div className="scrolleableBlock">
        {session && (
          <TextEntrySection
            text={session.summary.text}
            annotations={session.summary.annotations}
          />
        )}
      </div>
      {showCreateAnnotationModal && (
        <Modal
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
      )}
    </div>
  );
};
