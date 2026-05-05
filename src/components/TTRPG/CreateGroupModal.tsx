import { postGroup } from "@/src/api/ttrpg";
import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import { UserContext } from "@/src/store/user";
import { useContext } from "react";

type Props = {
  onClose: () => void;
};

export const CreateGroupModal: React.FC<Props> = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const handleCreateGroup = (values: { name: string }) => {
    if (!user) return;
    postGroup(values.name, user.id); // TODO: add user as member
    onClose();
  };
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
