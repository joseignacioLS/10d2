import { postSession } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Modal } from "@/src/components/Core/Modal";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Input } from "../Core/Input";
import Tiptap from "../Core/TipTap";

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
  const { user } = useContext(UserContext);
  const [input, setInput] = useState<{
    name: string;
    summary: string;
  }>({
    name: "",
    summary: "",
  });
  const router = useRouter();
  const handleCreateCampaign = useWrapFnWithToast(async () => {
    if (!user || !campaignId) throw "User error";
    const { data: sessionId } = await postSession(
      user.id,
      campaignId,
      input.name,
      input.summary,
      author,
    );
    if (!sessionId) throw "Error creando la sesión";

    router.push(`/sessions/${sessionId}`);
    onClose();
    return "Sesión creada con éxito";
  });

  const handleChange = (name: string, value: string) => {
    console.log({ name, value });
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleCreateCampaign}>
        <>
          <Input
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
            value={input.name}
          />
          <Tiptap
            name="summary"
            value={input.summary}
            onChange={handleChange}
            placeholder={"Introducción a la campaña"}
          />
        </>
      </Form>
    </Modal>
  );
};
