import { annotateSentence } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { Modal } from "@/src/components/Core/Modal";
import Tiptap from "@/src/components/Core/TipTap";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { useContext } from "react";

type Props = { sessionId: string; refetchSession: () => void };

export const AnnotateModal: React.FC<Props> = ({
  sessionId,
  refetchSession,
}) => {
  const { input, handleInput, resetInput } = useHandleInput({ annotation: "" });
  const {
    selectedSentence,
    showCreateAnnotationModal,
    closeCreateAnnotationModal,
  } = useContext(TTRPGSessionContext);

  const handleAnnotate = useWrapFnWithToast(
    async (text: string, position: number[]) => {
      const { error } = await annotateSentence(sessionId, position, text);
      if (error) {
        throw "Ha habido un error anotando la frase";
      }
      resetInput();
      closeCreateAnnotationModal();
      refetchSession();
      return "Texto anotado";
    },
  );
  return (
    <Modal
      isOpen={showCreateAnnotationModal}
      onClose={closeCreateAnnotationModal}
    >
      <>
        {selectedSentence && <p>{selectedSentence.text}</p>}
        <Tiptap
          name="annotation"
          value={input.annotation}
          onChange={handleInput}
        />
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
      </>
    </Modal>
  );
};
