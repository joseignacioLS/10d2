"use client";

import { getUserCharacterInCampaign } from "@/src/api/ttrpg";
import { UserContext } from "@/src/store/user";
import { Character } from "@/src/types/ttrpg";
import React, { createContext, useContext, useEffect, useReducer } from "react";

type TTRPGSessionState = {
  userCharacter?: { id: Character["id"] };
  showCreateAnnotationModal: boolean;
  selectedSentence:
    | {
        text: string;
        position: [number, number];
      }
    | undefined;
};

type TTRPGSessionAction = {
  type: string;
  payload?: any;
};

const initialState: TTRPGSessionState = {
  showCreateAnnotationModal: false,
  selectedSentence: undefined,
  userCharacter: undefined,
};

export const TTRPGSessionContext = createContext<{
  selectedSentence:
    | {
        text: string;
        position: [number, number];
      }
    | undefined;
  userCharacter?: { id: Character["id"] };
  showCreateAnnotationModal: boolean;
  openCreateAnnotationModal: () => void;
  closeCreateAnnotationModal: () => void;
  selectSentence: (sentence: {
    text: string;
    position: [number, number];
  }) => void;
  unselectSentence: () => void;
  getUserCharacter: (campaignId: string) => void;
}>({
  selectedSentence: undefined,
  showCreateAnnotationModal: false,
  userCharacter: undefined,
  openCreateAnnotationModal: () => {},
  closeCreateAnnotationModal: () => {},
  selectSentence: () => {},
  unselectSentence: () => {},
  getUserCharacter: (campaignId: string) => {},
});

const ttrpgSessionReducer = (
  state: TTRPGSessionState,
  action: TTRPGSessionAction,
) => {
  switch (action.type) {
    case "open-modal":
      return {
        ...state,
        showCreateAnnotationModal: true,
      };
    case "close-modal": {
      return {
        ...state,
        showCreateAnnotationModal: false,
      };
    }
    case "select-sentence": {
      return {
        ...state,
        selectedSentence: action.payload,
      };
    }
    case "unselect-sentence": {
      return {
        ...state,
        selectedSentence: undefined,
      };
    }
    case "set-user-character": {
      return {
        ...state,
        userCharacter: action.payload,
      };
    }
    default:
      return state;
  }
};

type Props = {
  children: React.ReactElement;
};

export const TTRPGSessionProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(ttrpgSessionReducer, initialState);

  const { user } = useContext(UserContext);

  const openCreateAnnotationModal = () => {
    dispatch({
      type: "open-modal",
    });
  };

  const closeCreateAnnotationModal = () => {
    dispatch({
      type: "close-modal",
    });
  };

  const selectSentence = (sentence: {
    text: string;
    position: [number, number];
  }) => {
    dispatch({
      type: "select-sentence",
      payload: sentence,
    });
  };

  const unselectSentence = () => {
    dispatch({
      type: "unselect-sentence",
    });
  };

  const getUserCharacter = (campaignId: string) => {
    getUserCharacterInCampaign(user?.id ?? "", campaignId).then(
      ({ data, error }) => {
        if (error) return;
        dispatch({
          type: "set-user-character",
          payload: data,
        });
      },
    );
  };

  useEffect(() => {}, []);

  return (
    <TTRPGSessionContext.Provider
      value={{
        selectedSentence: state.selectedSentence,
        userCharacter: state.userCharacter,
        showCreateAnnotationModal: state.showCreateAnnotationModal,
        openCreateAnnotationModal,
        closeCreateAnnotationModal,
        selectSentence,
        unselectSentence,
        getUserCharacter,
      }}
    >
      {children}
    </TTRPGSessionContext.Provider>
  );
};
