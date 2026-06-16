"use client";

import { Button } from "@/src/components/Core/Button";
import { Modal } from "@/src/components/Core/Modal";
import { SearchBar } from "@/src/components/TTRPG/SearchBar";
import { useState } from "react";

import styles from "./SearchModal.module.css";

type Props = {};

export const SearchModal: React.FC<Props> = ({}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)} className={styles.button}>
        <img src="/magnifying-glass.svg" />
      </Button>
      <Modal
        isOpen={showModal}
        title="Buscador"
        onClose={() => setShowModal(false)}
        className={styles.modal}
      >
        <SearchBar onSearchClick={() => setShowModal(false)} />
      </Modal>
    </>
  );
};
