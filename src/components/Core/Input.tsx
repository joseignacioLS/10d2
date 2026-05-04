import styles from "./Input.module.css";

type Props = {
  label?: string;
  id: string;
  name: string;
  type?: "text" | "number";
  placeholder: string;
  min?: number;
  onChange?: (value: string | number) => void;
};

export const Input: React.FC<Props> = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  min = 1,
  onChange = () => {},
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        minLength={min}
        maxLength={32}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};
