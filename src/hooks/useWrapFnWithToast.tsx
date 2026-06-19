import { ToastContext } from "@/src/store/toast";
import { useContext } from "react";

export const useWrapFnWithToast = (fn: (...args: any) => Promise<string>) => {
  const { createToast } = useContext(ToastContext);

  const wrappedFn = async (...args: any) => {
    return fn(...args)
      .then((successMsg) => {
        if (successMsg === "") return;
        createToast(successMsg, "info");
      })
      .catch((error) => {
        if (error === "") return;
        createToast(error, "error");
      });
  };

  return wrappedFn;
};
