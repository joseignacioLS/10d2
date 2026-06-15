"use client";

import { getUserInfo } from "@/src/api/user";
import { useReducerWithMiddleware } from "@/src/hooks/useReducerWithMiddleware";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { ToastContext } from "@/src/store/toast";
import { Campaign } from "@/src/types/ttrpg";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";
import { loginOnTokeRequest, loginRequest, logoutRequest } from "../api/auth";

type UserState = {
  token?: string;
  userData?: {
    id: string;
    username: string;
    subscriptions: Campaign["id"][];
  };
  loginModalOpen: boolean;
};

type UserAction =
  | { type: "error"; payload: string }
  | { type: "login"; payload: string }
  | {
      type: "logout" | "open_login_modal" | "close_login_modal";
    }
  | {
      type: "set_user_data";
      payload: {
        subscriptions: Campaign["id"][];
      };
    };

const initialState: UserState = {
  token: undefined,
  userData: undefined,
  loginModalOpen: false,
};

export const UserContext = createContext<{
  token: string | undefined;
  userData:
    | {
        id: string;
        username: string;
        subscriptions: Campaign["id"][];
        campaigns: Campaign[];
      }
    | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}>({
  token: undefined,
  userData: undefined,
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
        token: action.payload,
      };
    case "logout": {
      return {
        ...state,
        token: undefined,
        userData: undefined,
      };
    }
    case "set_user_data": {
      return {
        ...state,
        userData: action.payload,
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
      const { data: token, error } = await loginRequest(username, password);
      if (error !== null) {
        throw error;
      }
      dispatch({
        type: "login",
        payload: token,
      });
    } catch (err) {
      dispatch({
        type: "error",
        payload: err,
      });
    }
  };

  const logout = async () => {
    logoutRequest().then(() => {
      router.push("/");
      dispatch({
        type: "logout",
        payload: {
          info: "¡Hasta la próxima!",
        },
      });
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

  const refreshUserData = useWrapFnWithToast(async () => {
    if (!state.token) throw "Error actualizando tu información";
    const { data: member } = await getUserInfo();
    if (!member) throw "Error actualizando tu información";
    dispatch({
      type: "set_user_data",
      payload: {
        id: member.id,
        username: member.username,
        campaigns: member.campaigns,
        subscriptions: member.subscriptions,
      },
    });
    return "";
  });

  useEffect(() => {
    if (!state.token) return;
    refreshUserData();
  }, [state.token]);

  useEffect(() => {
    loginOnTokeRequest()
      .then(({ data, error }) => {
        if (error !== null) {
          throw error;
        }
        dispatch({
          type: "login",
          payload: data,
        });
      })
      .catch((err) => {
        // No se envía error para evitar
        // toast cuando no hay token almacenado
        // o ha caducado
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        userData: state.userData,
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
