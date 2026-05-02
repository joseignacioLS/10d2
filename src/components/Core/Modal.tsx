import React from "react";

import { Backdrop } from "./Backdrop";
import { Button } from "./Button";
import styles from "./Modal.module.css";

type Props = { children: React.ReactElement; onClose: () => void };

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <div className={styles.modalWrapper}>
      <Backdrop />
      <div className={styles.modalWindow}>
        <Button className={styles.closeBtn} onClick={onClose}>
          X
        </Button>
        {children}
      </div>
    </div>
  );
};
