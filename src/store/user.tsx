"use client";

import { followCampaign, getUserInfo, unfollowCampaign } from "@/src/api/ttrpg";
import { loginRequest } from "@/src/api/user";
import { useReducerWithMiddleware } from "@/src/hooks/useReducerWithMiddleware";
import { useWrapFnWithToast } from "@/src/hooks/useWrapFnWithToast";
import { ToastContext } from "@/src/store/toast";
import { Campaign, Group } from "@/src/types/ttrpg";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

type UserState = {
  token?: string;
  userData?: {
    id: string;
    username: string;
    groups: Group[];
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
        groups: Group[];
      }
    | undefined;
  refreshUserData: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  addCampaignToSubscriptions: () => Promise<void>;
  removeCampaignFromSubscriptions: () => Promise<void>;
}>({
  token: undefined,
  userData: undefined,
  refreshUserData: () => new Promise(() => {}),
  login: () => new Promise(() => {}),
  logout: () => new Promise(() => {}),
  loginModalOpen: false,
  openLoginModal: () => {},
  closeLoginModal: () => {},

  addCampaignToSubscriptions: () => new Promise(() => {}),
  removeCampaignFromSubscriptions: () => new Promise(() => {}),
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

  const addCampaignToSubscriptions = useWrapFnWithToast(
    async (campaignId: Campaign["id"]) => {
      const { error } = await followCampaign(state.user?.id, campaignId);
      if (error) throw error;
      await refreshUserData();
      return `Te has subscrito a esta campaña`;
    },
  );

  const removeCampaignFromSubscriptions = useWrapFnWithToast(
    async (campaignId: Campaign["id"]) => {
      const { error } = await unfollowCampaign(state.user?.id, campaignId);
      if (error) throw error;
      await refreshUserData();
      return `Te has desubscrito a esta campaña`;
    },
  );

  const refreshUserData = useWrapFnWithToast(async () => {
    if (!state.token) throw "Error actualizando tu información";
    const { data: member } = await getUserInfo(state.token);
    if (!member) throw "Error actualizando tu información";
    dispatch({
      type: "set_user_data",
      payload: { subscriptions: member?.subscriptions },
    });
    return "";
  });

  useEffect(() => {
    if (!state.token) return;
    refreshUserData();
  }, [state.token]);

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        userData: state.userData,
        refreshUserData,
        login,
        logout,
        loginModalOpen: state.loginModalOpen,
        openLoginModal,
        closeLoginModal,
        addCampaignToSubscriptions,
        removeCampaignFromSubscriptions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
