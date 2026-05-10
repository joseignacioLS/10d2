import { postCampaign } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import Tiptap from "@/src/components/Core/TipTap";
import { useHandleInput } from "@/src/hooks/useHandleInput";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";

type Props = {
  groupId: string;
  onClose: () => void;
};

export const CreateCampaignModal: React.FC<Props> = ({ onClose, groupId }) => {
  const { userData } = useContext(UserContext);
  const { input, handleInput } = useHandleInput(["name", "short", "summary"]);

  const router = useRouter();
  const handleCreateCampaign = useWrapFnWithToast(async () => {
    if (!userData || !groupId) throw "User error";
    const { data: campaignId } = await postCampaign(
      userData.id,
      groupId,
      input.name,
      input.short,
      input.summary,
    );
    if (!campaignId) throw "Error creando la campaña";

    router.push(`/campaigns/${campaignId}`);
    onClose();
    return "Campaña creada con éxito";
  });

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleCreateCampaign}>
        <>
          <Input
            label="Nombre"
            id="name"
            name="name"
            placeholder="Nombre"
            onChange={handleInput}
            value={input.name}
          />
          <Input
            label="Acrónimo"
            id="short"
            name="short"
            placeholder="Acrónimo"
            min={2}
            max={4}
            onChange={handleInput}
            value={input.short}
          />
          <Tiptap
            label="Resumen"
            name="summary"
            value={input.summary}
            onChange={handleInput}
            placeholder={"Introducción a la campaña"}
          />
        </>
      </Form>
    </Modal>
  );
};
