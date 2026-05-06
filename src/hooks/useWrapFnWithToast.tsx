import { ToastContext } from "@/src/store/toast";
import { useContext } from "react";

export const useWrapFnWithToast = (fn: (...args: any) => Promise<string>) => {
  const { createToast } = useContext(ToastContext);

  const wrappedFn = async (...args: any) => {
    fn(...args)
      .then((successMsg) => {
        createToast(successMsg, "info");
      })
      .catch((error) => {
        createToast(error, "error");
      });
  };

  return wrappedFn;
};
