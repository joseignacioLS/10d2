import { editAnnotation } from "@/src/api/ttrpg";
import { Button } from "@/src/components/Core/Button";
import { Modal } from "@/src/components/Core/Modal";
import Tiptap from "@/src/components/Core/TipTap";
import { UserTextBubble } from "@/src/components/Core/UserTextBubble";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { TTRPGSessionContext } from "@/src/store/ttrpgsession";
import { UserContext } from "@/src/store/user";
import { useContext, useState } from "react";
import styles from "./Annotation.module.css";

type Props = {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
  };
};

export const Annotation: React.FC<Props> = ({
  id,
  text,
  author = { id: undefined, name: "Unknown" },
}) => {
  const { userData } = useContext(UserContext);
  const [annotationText, setAnnotationText] = useState(text);
  const { session, handleDeleteAnnotation } = useContext(TTRPGSessionContext);

  const { input, handleInput } = useHandleInput({
    annotation: text,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const isAuthor =
    userData.campaigns.find(({ id }) => id === session?.campaign.id)?.character
      .id === author.id;

  return (
    <>
      <UserTextBubble color={"#5941b1"} width="full">
        <div dangerouslySetInnerHTML={{ __html: annotationText }}></div>
        <div className={styles.authorBar}>
          <i> - {author.name}</i>
          {isAuthor && (
            <div className={styles.actionsBar}>
              <Button
                onClick={() => setShowEditModal(true)}
                className={styles.deleteBtn}
              >
                Editar
              </Button>
              <Button
                onClick={() => handleDeleteAnnotation(id)}
                className={styles.deleteBtn}
              >
                Eliminar
              </Button>
            </div>
          )}
        </div>
      </UserTextBubble>
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <>
          <Tiptap
            name="annotation"
            value={input.annotation}
            onChange={handleInput}
          />
          <Button
            onClick={() => {
              editAnnotation(id, input.annotation)
                .then(() => {
                  setAnnotationText(input.annotation);
                  setShowEditModal(false);
                })
                .catch((err) => {
                  console.log({ err });
                });
            }}
          >
            Editar
          </Button>
        </>
      </Modal>
    </>
  );
};
