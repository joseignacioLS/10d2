"use client";

import { Form } from "@/src/components/Core/Form";
import { Modal } from "@/src/components/Core/Modal";
import { UserContext } from "@/src/store/user";
import { useContext, useEffect, useState } from "react";

import styles from "./LoginModal.module.css";

type Props = {};

export const LoginModal: React.FC<Props> = ({}) => {
  const { user, loginModalOpen, closeLoginModal, login } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      closeLoginModal();
    }
  }, [user]);

  if (!loginModalOpen) return null;

  return (
    <Modal onClose={closeLoginModal} title="">
      <Form
        onSubmit={async ({ name, password }) => {
          setLoading(true);
          await login(name, password);
          setLoading(false);
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
