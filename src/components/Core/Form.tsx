import { Button } from "@/src/components/Core/Button";
import { ReactElement, useRef } from "react";

import styles from "./Form.module.css";

type Props = {
  children: ReactElement;
  onSubmit: () => void;
  disabled?: boolean;
};

export const Form: React.FC<Props> = ({ children, onSubmit, disabled }) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }}
    >
      {children}
      <Button type="submit" className={styles.submitBtn} disabled={disabled}>
        Enviar
      </Button>
    </form>
  );
};
