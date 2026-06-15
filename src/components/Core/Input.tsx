import styles from "./Input.module.css";

type Props = {
  label?: string;
  id: string;
  name: string;
  placeholder: string;
  type?: "text" | "password" | "number" | "date";
  min?: number;
  max?: number;
  value: string;
  onChange: (name: string, value: string) => void;
  pattern?: string;
};

export const Input: React.FC<Props> = ({
  label,
  id,
  name,
  placeholder,
  type = "text",
  min,
  max,
  value,
  pattern = ".*",
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
        max={max}
        minLength={min}
        maxLength={max}
        value={value}
        pattern={pattern}
        onChange={(e) => {
          onChange(name, String(e.currentTarget.value));
        }}
      />
    </div>
  );
};
