"use client";

import { useContext } from "react";
import { UserContext } from "../store/user";
import { Form } from "./Core/Form";
import { Modal } from "./Core/Modal";

type Props = {};

export const LoginModal: React.FC<Props> = ({}) => {
  const { loginModalOpen, closeLoginModal, login } = useContext(UserContext);
  if (!loginModalOpen) return null;
  return (
    <Modal onClose={closeLoginModal}>
      <Form
        onSubmit={async ({ name, password }) => {
          await login(name, password)
            .then(() => {
              closeLoginModal();
            })
            .catch((err) => {
              alert(err);
            });
        }}
      >
        <>
          <input
            name="name"
            type="text"
            placeholder="Usuario"
            minLength={4}
            maxLength={32}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            minLength={8}
            maxLength={32}
          />
        </>
      </Form>
    </Modal>
  );
};
