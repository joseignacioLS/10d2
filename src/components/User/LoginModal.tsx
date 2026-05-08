"use client";

import { Form } from "@/src/components/Core/Form";
import { Input } from "@/src/components/Core/Input";
import { Modal } from "@/src/components/Core/Modal";
import { UserContext } from "@/src/store/user";
import { useContext, useEffect, useState } from "react";

import styles from "./LoginModal.module.css";
import { useHandleInput } from "@/src/hooks/useHandleInput";

type Props = {};

export const LoginModal: React.FC<Props> = ({}) => {
  const { user, loginModalOpen, closeLoginModal, login } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { input, handleInput } = useHandleInput(["name", "password"]);

  useEffect(() => {
    if (user) {
      closeLoginModal();
    }
  }, [user]);

  if (!loginModalOpen) return null;

  return (
    <Modal onClose={closeLoginModal} title="">
      <Form
        onSubmit={async () => {
          setLoading(true);
          await login(input.name, input.password);
          setLoading(false);
        }}
        disabled={loading}
      >
        <section className={styles.inputsWrapper}>
          <label htmlFor="name">Usuario</label>
          <Input
            id="name"
            name="name"
            placeholder="Usuario"
            value={input.name}
            onChange={handleInput}
            pattern={"[A-Za-z]{6,16}"}
          />
          <label htmlFor="password">Contraseña</label>
          <Input
            id="password"
            name="password"
            placeholder="Contraseña"
            type="password"
            pattern={"[A-Za-z]{6-32}"}
            value={input.password}
            onChange={handleInput}
          />
        </section>
      </Form>
    </Modal>
  );
};
