import { useMemo, useState } from "react";

export const useHandleInput = <T extends readonly string[]>(keys: T) => {
  const initialValue = useMemo(
    () =>
      Object.fromEntries(keys.map((k) => [k, ""])) as Record<T[number], string>,
    [keys],
  );
  const [input, setInput] = useState<Record<T[number], string>>(initialValue);

  const handleInput = (key: T[number], value: string) => {
    setInput((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const resetInput = () => {
    setInput(initialValue);
  };

  return { input, handleInput, resetInput };
};
