import { Button } from "@/src/components/Core/Button";
import { Modal } from "@/src/components/Core/Modal";
import Tiptap from "@/src/components/Core/TipTap";
import { useHandleInput } from "@/src/hooks/useHandleInput";
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
    handleAnnotate,
  } = useContext(TTRPGSessionContext);

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
            handleAnnotate(
              sessionId,
              input.annotation,
              selectedSentence.position,
            ).then(() => {
              refetchSession();
              resetInput();
              closeCreateAnnotationModal();
            });
          }}
        >
          Guardar
        </Button>
      </>
    </Modal>
  );
};
