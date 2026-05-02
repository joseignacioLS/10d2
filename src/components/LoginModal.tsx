"use client";

import { useContext, useState } from "react";
import { UserContext } from "../store/user";
import { Form } from "./Core/Form";
import { Modal } from "./Core/Modal";

import styles from "./LoginModal.module.css";

type Props = {};

export const LoginModal: React.FC<Props> = ({}) => {
  const { loginModalOpen, closeLoginModal, login } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  if (!loginModalOpen) return null;
  return (
    <Modal onClose={closeLoginModal} title="">
      <Form
        onSubmit={async ({ name, password }) => {
          setLoading(true);
          await login(name, password)
            .then(() => {
              closeLoginModal();
            })
            .catch((err) => {
              alert(err);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        disabled={loading}
      >
        <section className={styles.inputsWrapper}>
          <label htmlFor="name">Usuario</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Usuario"
            minLength={4}
            maxLength={32}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            minLength={8}
            maxLength={32}
          />
        </section>
      </Form>
    </Modal>
  );
};
