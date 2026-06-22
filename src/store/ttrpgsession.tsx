"use client";

import { UserContext } from "@/src/store/user";
import { SessionDetail } from "@/src/types/ttrpg";
import React, { createContext, useContext, useEffect, useReducer } from "react";

type TTRPGSessionState = {
  session: SessionDetail | undefined;
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
  session: undefined,
  showCreateAnnotationModal: false,
  selectedSentence: undefined,
  canAnnotate: false,
};

export const TTRPGSessionContext = createContext<{
  session: SessionDetail | undefined;
  setSessionIds: (sessionId: string, campaignId: string) => void;
  refetchSession: () => Promise<void>;
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
}>({
  session: undefined,
  setSessionIds: () => {},
  refetchSession: () => new Promise(() => {}),
  selectedSentence: undefined,
  showCreateAnnotationModal: false,
  canAnnotate: false,
  openCreateAnnotationModal: () => {},
  closeCreateAnnotationModal: () => {},
  selectSentence: () => {},
  unselectSentence: () => {},
  updateAnnotatePermission: () => {},
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
    case "set-session": {
      return {
        ...state,
        session: action.payload,
      };
    }
    default:
      return state;
  }
};

type Props = {
  session: SessionDetail;
  refetchSession: () => Promise<void>;
  children: React.ReactElement;
};

export const TTRPGSessionProvider = ({
  session,
  refetchSession,
  children,
}: Props) => {
  const [state, dispatch] = useReducer(ttrpgSessionReducer, initialState);

  const { userData } = useContext(UserContext);

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

  const setSessionIds = (sessionId: string, campaignId: string) => {
    dispatch({
      type: "set-session-ids",
      payload: {
        sessionId,
        campaignId,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: "set-session",
      payload: session,
    });
  }, [session, session?.id]);

  useEffect(() => {
    updateAnnotatePermission(
      ["player", "GM"].includes(userData.permissions[session?.campaign.id]),
    );
  }, [session?.campaign.id, userData.permissions]);

  return (
    <TTRPGSessionContext.Provider
      value={{
        session: state.session,
        setSessionIds,
        refetchSession,
        selectedSentence: state.selectedSentence,
        canAnnotate: state.canAnnotate,
        showCreateAnnotationModal: state.showCreateAnnotationModal,
        openCreateAnnotationModal,
        closeCreateAnnotationModal,
        selectSentence,
        unselectSentence,
        updateAnnotatePermission,
      }}
    >
      {children}
    </TTRPGSessionContext.Provider>
  );
};
