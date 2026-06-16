import { Button } from "@/src/components/Core/Button";
import React, { useEffect, useRef } from "react";

import styles from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  children: React.ReactElement;
  onClose: () => void;
  title?: string;
  className?: string;
};

export const Modal: React.FC<Props> = ({
  isOpen = false,
  children,
  onClose,
  title = "",
  className = "",
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  const closeModal = () => {
    onClose?.();
  };

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog ref={ref} className={`${styles.modalWindow} ${className}`}>
      <Button className={styles.closeBtn} onClick={closeModal}>
        X
      </Button>
      <p className={styles.modalTitle}>{title}</p>
      <section className={styles.modalBody}>{children}</section>
    </dialog>
  );
};
