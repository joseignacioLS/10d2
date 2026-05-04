import { useRef } from "react";
import { ServiceResponse } from "../types/api";

export const useDebounce = <T,>(
  fn: (...params: any) => Promise<ServiceResponse<T>>,
  time: number,
) => {
  const ref = useRef<NodeJS.Timeout>(null);

  const callFn = async (...params: any): Promise<ServiceResponse<T>> => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    return new Promise((res) => {
      ref.current = setTimeout(
        () => fn(...params).then((data) => res(data)),
        time,
      );
    });
  };

  return callFn;
};
