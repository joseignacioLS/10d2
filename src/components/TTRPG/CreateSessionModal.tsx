import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import Tiptap from "@/src/components/Core/TipTap";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { useHandleInput } from "@/src/hooks/useHandleInput";
import styles from "./CreateSessionModal.module.css";

type Props = {
  campaignId: string;
  author: string;
  onClose: () => void;
};

export const CreateSessionModal: React.FC<Props> = ({
  onClose,
  author,
  campaignId,
}) => {
  const { userData } = useContext(UserContext);
  const { input, handleInput } = useHandleInput(["name", "summary"]);

  const router = useRouter();
  const handleCreateCampaign = useWrapFnWithToast(async () => {
    if (!userData || !campaignId) throw "User error";
    // const { data: sessionId } = await postSession(
    //   userData.id,
    //   campaignId,
    //   input.name,
    //   input.summary,
    //   author,
    // );
    // if (!sessionId) throw "Error creando la sesión";

    // router.push(`/sessions/${sessionId}`);
    onClose();
    return "Sesión creada con éxito";
  });

  return (
    <Modal
      title={`Crear nueva entrada`}
      onClose={onClose}
      className={styles.createSessionModal}
    >
      <Form
        onSubmit={handleCreateCampaign}
        disabled={input.name.length < 12 || input.summary.length < 64}
      >
        <>
          <Input
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={handleInput}
            value={input.name}
            label="Nombre"
            min={12}
            max={128}
          />
          <Tiptap
            name="summary"
            value={input.summary}
            onChange={handleInput}
            placeholder={"Introducción a la campaña"}
            label="Resumen"
          />
        </>
      </Form>
    </Modal>
  );
};
