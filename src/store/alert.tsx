"use client";

import React, { createContext, ReactNode, useReducer, useRef } from "react";

type AlertButton = {
  text: ReactNode;
  callback: () => void;
};

type AlertAction =
  | {
      type: "open";
      payload: {
        message: ReactNode;
        buttons: AlertButton[];
      };
    }
  | {
      type: "close";
    };

type AlertState = {
  message: ReactNode;
  buttons: AlertButton[];
  isOpen: boolean;
};

const initialState: AlertState = {
  message: undefined,
  buttons: [],
  isOpen: false,
};

export const AlertContext = createContext<{
  message: ReactNode;
  buttons: AlertButton[];
  isOpen: boolean;
  createAlert: (message: ReactNode, buttons: AlertButton[]) => void;
  closeAlert: () => void;
}>({
  message: undefined,
  buttons: [],
  isOpen: false,
  createAlert: () => {},
  closeAlert: () => {},
});

const alertReducer = (state: AlertState, action: AlertAction) => {
  switch (action.type) {
    case "open":
      return {
        ...state,
        message: action.payload.message,
        buttons: action.payload.buttons,
        isOpen: true,
      };
    case "close": {
      return {
        ...state,
        message: undefined,
        buttons: [],
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

export const AlertProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const createAlert = (message: ReactNode, buttons: AlertButton[]) => {
    dispatch({
      type: "open",
      payload: {
        message,
        buttons,
      },
    });
  };

  const closeAlert = () => {
    dispatch({
      type: "close",
    });
  };

  return (
    <AlertContext.Provider
      value={{
        message: state.message,
        buttons: state.buttons,
        isOpen: state.isOpen,
        createAlert,
        closeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
