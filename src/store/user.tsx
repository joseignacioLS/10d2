"use client";

import React, { createContext, useReducer } from "react";
import { loginRequest } from "../api/user";

type UserState = {
  username: string | undefined;
};

type UserAction = {
  type: "login";
  payload: string;
};

const initialState: UserState = {
  username: undefined,
};

export const UserContext = createContext<{
  username: string | undefined;
  login: (username: string, password: string) => Promise<void>;
}>({
  username: undefined,
  login: () => new Promise(() => {}),
});

const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "login":
      console.log("login", action.payload);
      return {
        ...state,
        username: action.payload,
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
  return (
    <UserContext.Provider
      value={{
        username: state.username,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
