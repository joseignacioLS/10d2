"use client";

import React, { createContext, useReducer, useRef } from "react";

type ToastType = "info" | "warning" | "error";

type ToastState = {
  message: string;
  type: ToastType;
  isOpen: boolean;
};

type ToastAction =
  | {
      type: "open";
      payload: { message: string; type: ToastType };
    }
  | {
      type: "close";
    };

const initialState: ToastState = {
  message: "",
  type: "info",
  isOpen: false,
};

export const ToastContext = createContext<{
  message: string;
  isOpen: boolean;
  type: ToastType;
  createToast: (message: string, type: ToastType) => void;
  middleware: (...args: any) => void;
}>({
  message: "",
  isOpen: false,
  type: "info",
  createToast: () => {},
  middleware: (...args: any) => {},
});

const toastReducer = (state: ToastState, action: ToastAction) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        isOpen: true,
      };
    case "close": {
      return {
        ...state,
        isOpen: false,
      };
    }
    default:
      return state;
  }
};

type Props = {
  children: React.ReactElement;
};

export const ToastProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const toastRef = useRef<NodeJS.Timeout>(null);

  const createToast = (message: string, type: ToastType) => {
    if (toastRef?.current !== null) {
      clearTimeout(toastRef.current);
    }
    dispatch({
      type: "open",
      payload: {
        message,
        type,
      },
    });
    toastRef.current = setTimeout(() => {
      dispatch({
        type: "close",
      });
    }, 4000);
  };

  const middleware = (args: {
    type: string;
    payload?:
      | string
      | {
          info?: string;
          warning?: string;
          error?: string;
        };
  }) => {
    if (args.type === "error") {
      createToast(args.payload as string, "error");
      return;
    }
    if (typeof args.payload === "object") {
      if (args.payload?.info) {
        createToast(args.payload.info, "info");
      }
      if (args.payload?.warning) {
        createToast(args.payload.warning, "warning");
      }
      if (args.payload?.error) {
        createToast(args.payload.error, "error");
      }
    }
  };

  return (
    <ToastContext.Provider
      value={{
        message: state.message,
        type: state.type,
        isOpen: state.isOpen,
        createToast,
        middleware,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
