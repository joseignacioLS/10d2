"use client";

import { Form } from "@/src/components/Core/Form";
import { Modal } from "@/src/components/Core/Modal";
import { UserContext } from "@/src/store/user";
import { useContext, useEffect, useState } from "react";

import { Input } from "../Core/Input";
import styles from "./LoginModal.module.css";

type Props = {};

export const LoginModal: React.FC<Props> = ({}) => {
  const { user, loginModalOpen, closeLoginModal, login } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<{
    name: string;
    password: string;
  }>({
    name: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      closeLoginModal();
    }
  }, [user]);

  const handleChange = (name: string, value: string) => {
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

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
            min={4}
            max={32}
            value={input.name}
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña</label>
          <Input
            id="password"
            name="password"
            placeholder="Contraseña"
            type="password"
            min={8}
            max={32}
            value={input.password}
            onChange={handleChange}
          />
        </section>
      </Form>
    </Modal>
  );
};
