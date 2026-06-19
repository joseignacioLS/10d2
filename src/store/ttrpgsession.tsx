"use client";

import React, { createContext, useReducer } from "react";
import { annotateSentence } from "../api/ttrpg";
import { useWrapFnWithToast } from "../hooks/useWrapFnWithToast";

type TTRPGSessionState = {
  canAnnotate: boolean;
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
  canAnnotate: false,
};

export const TTRPGSessionContext = createContext<{
  selectedSentence:
    | {
        text: string;
        position: [number, number];
      }
    | undefined;
  canAnnotate: boolean;
  showCreateAnnotationModal: boolean;
  openCreateAnnotationModal: () => void;
  closeCreateAnnotationModal: () => void;
  selectSentence: (sentence: {
    text: string;
    position: [number, number];
  }) => void;
  unselectSentence: () => void;
  updateAnnotatePermission: (state: boolean) => void;
  handleAnnotate: (
    sessionId: string,
    annotation: string,
    position: number[],
  ) => Promise<void>;
}>({
  selectedSentence: undefined,
  showCreateAnnotationModal: false,
  canAnnotate: false,
  openCreateAnnotationModal: () => {},
  closeCreateAnnotationModal: () => {},
  selectSentence: () => {},
  unselectSentence: () => {},
  updateAnnotatePermission: () => {},
  handleAnnotate: () => new Promise(() => {}),
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
    case "can-annotate": {
      return {
        ...state,
        canAnnotate: action.payload,
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

  const updateAnnotatePermission = async (value: boolean) => {
    dispatch({
      type: "can-annotate",
      payload: value,
    });
  };

  const handleAnnotate = useWrapFnWithToast(
    async (sessionId: string, text: string, position: number[]) => {
      const { error } = await annotateSentence(sessionId, position, text);
      if (error) {
        throw "Ha habido un error anotando la frase";
      }
      closeCreateAnnotationModal();
      return "Texto anotado";
    },
  );

  return (
    <TTRPGSessionContext.Provider
      value={{
        selectedSentence: state.selectedSentence,
        canAnnotate: state.canAnnotate,
        showCreateAnnotationModal: state.showCreateAnnotationModal,
        openCreateAnnotationModal,
        closeCreateAnnotationModal,
        selectSentence,
        unselectSentence,
        updateAnnotatePermission,
        handleAnnotate,
      }}
    >
      {children}
    </TTRPGSessionContext.Provider>
  );
};
