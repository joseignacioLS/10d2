import type { ReactNode } from "react";
import styles from "./Button.module.css";
type Props = {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  className = "",
  onClick = () => {},
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
