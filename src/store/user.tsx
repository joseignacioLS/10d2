"use client";

import React, { createContext, useReducer } from "react";
import { loginRequest } from "../api/user";

type UserState = {
  username: string | undefined;
  loginModalOpen: boolean;
};

type UserAction = {
  type: "login" | "logout" | "open_login_modal" | "close_login_modal";
  payload?: string;
};

const initialState: UserState = {
  username: undefined,
  loginModalOpen: false,
};

export const UserContext = createContext<{
  username: string | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}>({
  username: undefined,
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
        username: action.payload,
      };
    case "logout": {
      return {
        ...state,
        username: undefined,
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
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (username: string, password: string) => {
    try {
      const { error } = await loginRequest(username, password);
      if (error) {
        throw error;
      }
      dispatch({
        type: "login",
        payload: username,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    dispatch({
      type: "logout",
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
        username: state.username,
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
