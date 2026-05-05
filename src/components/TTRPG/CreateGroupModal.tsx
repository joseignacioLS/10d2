import { postGroup } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { UserContext } from "@/src/store/user";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

type Props = {
  onClose: () => void;
};

export const CreateGroupModal: React.FC<Props> = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [input, setInput] = useState<{
    name: string;
  }>({
    name: "",
  });

  const handleCreateGroup = useWrapFnWithToast(async () => {
    if (!user) throw "No existe el usuario";

    const { data: groupId } = await postGroup(input.name, user.id); // TODO: add user as member

    if (!groupId) throw "No se ha podido crear el grupo";

    router.push(`/groups/${groupId}`);
    onClose();

    return "Grupo creado con éxito";
  });

  const handleChange = (name: string, value: string) => {
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleCreateGroup}>
        <Input
          label="Nombre"
          id="name"
          name="name"
          placeholder="Nombre del grupo"
          value={input.name}
          onChange={handleChange}
        ></Input>
      </Form>
    </Modal>
  );
};
