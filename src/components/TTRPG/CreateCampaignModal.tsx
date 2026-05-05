import { postCampaign } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Modal } from "@/src/components/Core/Modal";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Input } from "../Core/Input";

type Props = {
  groupId: string;
  onClose: () => void;
};

export const CreateCampaignModal: React.FC<Props> = ({ onClose, groupId }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const handleCreateCampaign = useWrapFnWithToast(
    async ({
      name,
      short,
      summary,
    }: {
      name: string;
      short: string;
      summary: string;
    }) => {
      if (!user || !groupId) throw "User error";
      const { data: campaignId } = await postCampaign(
        user.id,
        groupId,
        name,
        short,
        summary,
      );
      if (!campaignId) throw "Error creando la campaña";

      router.push(`/campaigns/${campaignId}`);
      onClose();
      return "Campaña creada con éxito";
    },
  );
  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleCreateCampaign}>
        <>
          <Input id="name" name="name" placeholder="Nombre" />
          <Input
            id="short"
            name="short"
            placeholder="Acrónimo"
            min={2}
            max={4}
          />
          <Input
            id="summary"
            name="summary"
            placeholder="Resumen de la partida"
            min={0}
            max={512}
          />
        </>
      </Form>
    </Modal>
  );
};
