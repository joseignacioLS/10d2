import { deleteGroup } from "@/src/api/ttrpg";
import { ToastContext } from "@/src/store/toast";
import { Group } from "@/src/types/ttrpg";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Button } from "../Core/Button";
import { Input } from "../Core/Input";
import { Modal } from "../Core/Modal";
import { useHandleInput } from "@/src/hooks/useHandleInput";

type Props = {
  onClose: () => void;
  group: Pick<Group, "id" | "name">;
};

export const DeleteGroupModal: React.FC<Props> = ({ onClose, group }) => {
  const { input, handleInput } = useHandleInput(["group"]);
  const { createToast } = useContext(ToastContext);
  const router = useRouter();

  const handleDeleteGroup = () => {
    deleteGroup(group.id)
      .then(({ error }) => {
        if (error) throw error;
        router.push("/");
      })
      .catch((err) => {
        createToast(err, "error");
      });
  };

  return (
    <Modal
      onClose={() => {
        onClose();
      }}
    >
      <>
        <p>Estás a punto de eliminar el grupo {group.name}</p>
        <Input
          id="group"
          name="group"
          value={input.group}
          onChange={handleInput}
          placeholder={group.name}
          label={`Escribe "${group.name}" para confirmar la eliminación`}
        ></Input>
        <Button
          onClick={handleDeleteGroup}
          disabled={group.name !== input.group}
          className="danger"
        >
          Eliminar
        </Button>
      </>
    </Modal>
  );
};
