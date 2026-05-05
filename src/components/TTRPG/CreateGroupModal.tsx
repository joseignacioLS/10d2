import { postGroup } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";

type Props = {
  onClose: () => void;
};

export const CreateGroupModal: React.FC<Props> = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleCreateGroup = useWrapFnWithToast(
    async (values: { name: string }) => {
      if (!user) throw "No existe el usuario";

      const { data: groupId } = await postGroup(values.name, user.id); // TODO: add user as member

      if (!groupId) throw "No se ha podido crear el grupo";

      router.push(`/groups/${groupId}`);
      onClose();

      return "Grupo creado con éxito";
    },
  );

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleCreateGroup}>
        <Input
          label="Nombre"
          id="name"
          name="name"
          type="text"
          placeholder="Nombre del grupo"
        ></Input>
      </Form>
    </Modal>
  );
};
