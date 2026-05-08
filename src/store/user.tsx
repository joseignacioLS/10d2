"use client";

import { getMember, loginRequest } from "@/src/api/user";
import { useReducerWithMiddleware } from "@/src/hooks/useReducerWithMiddleware";
import { ToastContext } from "@/src/store/toast";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { followCampaign, unfollowCampaign } from "../api/ttrpg";
import { useWrapFnWithToast } from "../hooks/useWrapFnWithToast";
import { Campaign } from "../types/ttrpg";

type UserState = {
  user: { id: string; username: string } | undefined;
  userData: {
    subscriptions: Campaign["id"][];
  };
  loginModalOpen: boolean;
};

type UserAction =
  | { type: "error"; payload: string }
  | { type: "login"; payload: { id: string; username: string } }
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
  user: undefined,
  userData: { subscriptions: [] },
  loginModalOpen: false,
};

export const UserContext = createContext<{
  user: { id: string; username: string } | undefined;
  userData: { subscriptions: Campaign["id"][] };
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  addCampaignToSubscriptions: () => Promise<void>;
  removeCampaignFromSubscriptions: () => Promise<void>;
}>({
  user: undefined,
  userData: { subscriptions: [] },
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
        user: action.payload,
      };
    case "logout": {
      return {
        ...state,
        user: undefined,
        userData: {
          subscriptions: [],
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
      const { data: id, error } = await loginRequest(username, password);
      if (error !== null) {
        throw error;
      }
      dispatch({
        type: "login",
        payload: { id, username, info: `Hola ${username}` },
      });
      await refreshUserData(id);
    } catch (err) {
      console.log(err);
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

  const refreshUserData = useWrapFnWithToast(async (userId?: string) => {
    if (!state.user && userId === undefined)
      throw "Error actualizando tu información";
    const { data: member } = await getMember(state.user?.id ?? userId);
    if (!member) throw "Error actualizando tu información";
    dispatch({
      type: "set_user_data",
      payload: { subscriptions: member?.subscriptions },
    });
    return "";
  });

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        userData: state.userData,
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
