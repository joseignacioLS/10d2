"use client";

import { loginRequest } from "@/src/api/user";
import { useReducerWithMiddleware } from "@/src/hooks/useReducerWithMiddleware";
import { ToastContext } from "@/src/store/toast";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";

type UserState = {
  user: { id: string; username: string } | undefined;
  loginModalOpen: boolean;
};

type UserAction =
  | { type: "error"; payload: string }
  | { type: "login"; payload: { id: string; username: string } }
  | {
      type: "logout" | "open_login_modal" | "close_login_modal";
    };

const initialState: UserState = {
  user: undefined,
  loginModalOpen: false,
};

export const UserContext = createContext<{
  user: { id: string; username: string } | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}>({
  user: undefined,
  login: () => new Promise(() => {}),
  logout: () => new Promise(() => {}),
  loginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
      };
    case "logout": {
      return {
        ...state,
        user: undefined,
      };
    }
    case "open_login_modal":
      return {
        ...state,
        loginModalOpen: true,
      };
    case "close_login_modal":
      return {
        ...state,
        loginModalOpen: false,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactElement;
};

export const UserProvider = ({ children }: Props) => {
  const { middleware } = useContext(ToastContext);
  const [state, dispatch] = useReducerWithMiddleware(
    userReducer,
    initialState,
    middleware,
  );
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const { data: id, error } = await loginRequest(username, password);
      if (error !== null) {
        throw error;
      }
      dispatch({
        type: "login",
        payload: { id, username, info: `Hola ${username}` },
      });
    } catch (err) {
      dispatch({
        type: "error",
        payload: "Error en el login",
      });
    }
  };

  const logout = async () => {
    router.push("/");
    dispatch({
      type: "logout",
      payload: {
        info: "¡Hasta la próxima!",
      },
    });
  };

  const openLoginModal = () => {
    dispatch({
      type: "open_login_modal",
    });
  };

  const closeLoginModal = () => {
    dispatch({
      type: "close_login_modal",
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        loginModalOpen: state.loginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
