import { postGroup } from "@/src/api/ttrpg";
import { Form } from "../Core/Form";
import { Input } from "../Core/Input";
import { Modal } from "../Core/Modal";
import { useContext } from "react";
import { UserContext } from "@/src/store/user";

type Props = {
  onClose: () => void;
};

export const CreateGroupModal: React.FC<Props> = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const handleCreateGroup = (values: { name: string }) => {
    if (!user) return;
    postGroup(values.name, user); // TODO: add user as member
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
