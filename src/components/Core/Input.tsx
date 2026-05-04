import styles from "./Input.module.css";

type Props = {
  label: string;
  id: string;
  name: string;
  type?: "text" | "number";
  placeholder: string;
};

export const Input: React.FC<Props> = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={4}
        maxLength={32}
      />
    </div>
  );
};
