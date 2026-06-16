"use client";

import { useEffect, useState } from "react";

export const useHandleInput = (initialState: Record<string, string>) => {
  const [input, setInput] = useState(initialState);
  const [hasChanged, setHasChanged] = useState(false);

  const handleInput = (key: string, value: string) => {
    setInput((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const resetInput = () => {
    setInput(initialState);
  };

  useEffect(() => {
    setHasChanged(() => {
      return Object.keys(input).some((k) => {
        return input[k] !== initialState[k];
      });
    });
  }, [input, initialState]);

  return { input, handleInput, resetInput, hasChanged };
};
