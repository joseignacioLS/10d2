import { postCampaign } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Modal } from "@/src/components/Core/Modal";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Input } from "../Core/Input";

type Props = {
  groupId: string;
  onClose: () => void;
};

export const CreateCampaignModal: React.FC<Props> = ({ onClose, groupId }) => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState<{
    name: string;
    short: string;
    summary: string;
  }>({
    name: "",
    short: "",
    summary: "",
  });
  const router = useRouter();
  const handleCreateCampaign = useWrapFnWithToast(async () => {
    if (!user || !groupId) throw "User error";
    const { data: campaignId } = await postCampaign(
      user.id,
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

  const handleChange = (name: string, value: string) => {
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
          <Input
            id="short"
            name="short"
            placeholder="Acrónimo"
            min={2}
            max={4}
            onChange={handleChange}
            value={input.short}
          />
          <Input
            id="summary"
            name="summary"
            placeholder="Resumen de la partida"
            min={0}
            max={512}
            onChange={handleChange}
            value={input.summary}
          />
        </>
      </Form>
    </Modal>
  );
};
