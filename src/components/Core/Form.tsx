import { ReactElement, useRef } from "react";
import { Button } from "./Button";

type Props = { children: ReactElement; onSubmit: (data: any) => void };

export const Form: React.FC<Props> = ({ children, onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = formRef.current;
        if (!form) return;

        const data = new FormData(form);
        const values = Object.fromEntries(data.entries());

        onSubmit(values);
      }}
    >
      {children}
      <Button type="submit">Enviar</Button>
    </form>
  );
};
