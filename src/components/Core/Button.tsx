import type { ReactNode } from "react";
import styles from "./Button.module.css";
type Props = {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: HTMLButtonElement["type"];
};

export const Button: React.FC<Props> = ({
  children,
  className = "",
  onClick = () => {},
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
