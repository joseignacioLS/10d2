import styles from "./Input.module.css";

type Props = {
  label?: string;
  id: string;
  name: string;
  placeholder: string;
  type?: "text" | "password";
  min?: number;
  max?: number;
  value: string;
  onChange: (name: string, value: string) => void;
};

export const Input: React.FC<Props> = ({
  label,
  id,
  name,
  placeholder,
  type = "text",
  min = 1,
  max = 32,
  value,
  onChange,
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
        maxLength={max}
        value={value}
        onChange={(e) => {
          onChange(name, e.currentTarget.value);
        }}
      />
    </div>
  );
};
