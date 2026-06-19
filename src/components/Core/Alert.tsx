"use client";

import { Modal } from "@/src/components/Core/Modal";
import { AlertContext } from "@/src/store/alert";
import { useContext } from "react";
import { Button } from "./Button";

type Props = {};

export const Alert: React.FC<Props> = () => {
  const { message, buttons, isOpen, closeAlert } = useContext(AlertContext);

  const handleCallback = (callback: () => void) => {
    callback?.();
    closeAlert();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAlert}>
      <>
        {message}
        <div>
          {buttons.map(({ text, callback }) => {
            return (
              <Button
                key={text?.toString()}
                onClick={() => {
                  handleCallback(callback);
                }}
              >
                {text}
              </Button>
            );
          })}
        </div>
      </>
    </Modal>
  );
};
