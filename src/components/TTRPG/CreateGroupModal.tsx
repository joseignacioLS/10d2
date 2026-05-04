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
  const handleCreateGroup = (values: { name: string }) => {
    postGroup(values.name); // TODO: add user as member
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
