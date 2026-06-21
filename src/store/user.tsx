"use client";

import { getUserInfo } from "@/src/api/user";
import { useReducerWithMiddleware } from "@/src/hooks/useReducerWithMiddleware";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { ToastContext } from "@/src/store/toast";
import { Campaign, Member } from "@/src/types/ttrpg";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";
import { loginOnTokeRequest, loginRequest, logoutRequest } from "../api/auth";

type UserState = {
  token?: string;
  userData?: {
    id: string;
    username: string;
    state: "logout" | "login" | "loading";
    subscriptions: Campaign["id"][];
    campaigns: {
      id: Campaign["id"];
      name: Campaign["name"];
      role: "GM" | "player";
      character: {
        id: string;
        name: string;
      };
    }[];
    permissions: Record<string, "GM" | "player">;
  };
  loginModalOpen: boolean;
};

type UserAction =
  | { type: "error"; payload: string }
  | { type: "start-login" }
  | { type: "login"; payload: { token: string } }
  | { type: "login-error" }
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
  userData: {
    id: "",
    state: "loading",
    username: "",
    subscriptions: [],
    campaigns: [],
    permissions: {},
  },
  loginModalOpen: false,
};

export const UserContext = createContext<{
  token: string | undefined;
  userData: {
    id: string;
    username: string;
    state: "logout" | "login" | "loading";
    subscriptions: Campaign["id"][];
    campaigns: {
      id: Campaign["id"];
      name: Campaign["name"];
      role: "GM" | "player";
      character: {
        id: string;
        name: string;
      };
    }[];
    permissions: Record<string, "GM" | "player">;
  };
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}>({
  token: undefined,
  userData: {
    id: "",
    state: "loading",
    username: "",
    subscriptions: [],
    campaigns: [],
    permissions: {},
  },
  login: () => new Promise(() => {}),
  logout: () => new Promise(() => {}),
  loginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},
});

const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "start-login":
      return {
        ...state,
        userData: {
          ...state.userData,
          state: "loading",
        },
      };
    case "login":
      localStorage.setItem("authtoken", action.payload.token);
      return {
        ...state,
        token: action.payload,
      };
    case "login-error":
      return {
        ...state,
        token: undefined,
        userData: {
          id: "",
          state: "logout",
          username: "",
          subscriptions: [],
          campaigns: [],
          permissions: {},
        },
      };
    case "logout": {
      localStorage.removeItem("authtoken");
      return {
        ...state,
        token: undefined,
        userData: {
          id: "",
          state: "logout",
          username: "",
          subscriptions: [],
          campaigns: [],
          permissions: {},
        },
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
      dispatch({
        type: "start-login",
      });
      const { data: token, error } = await loginRequest(username, password);
      if (error !== null) {
        throw error;
      }
      dispatch({
        type: "login",
        payload: { token: token, info: "¡Hola de nuevo!" },
      });
    } catch (err) {
      dispatch({
        type: "login-error",
        payload: {
          error: err,
        },
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
    if (!state.token)
      throw "Error actualizando tu información. No existe el token";
    const { data: member } = await getUserInfo();
    if (!member)
      throw "Error actualizando tu información. No existe el usuario";

    const permissions: Record<string, "GM" | "player"> = {};

    member.campaigns.forEach(({ id, role }) => {
      permissions[id] = role;
    });
    dispatch({
      type: "set_user_data",
      payload: {
        id: member.id,
        state: "login",
        username: member.username,
        campaigns: member.campaigns,
        subscriptions: member.subscriptions,
        permissions,
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
          payload: { token: data },
        });
      })
      .catch((err) => {
        dispatch({
          type: "login-error",
        });
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
