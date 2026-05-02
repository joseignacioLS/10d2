import { useEffect, useState } from "react";
import {
  Campaigns,
  Characters,
  Groups,
  Members,
  Sessions,
} from "../assets/bbdd";
import { Campaign, Character, Group, Member, Session } from "../types/ttrpg";

export const useGameData = ({
  groupId,
  campaignId,
  sessionId,
  memberId,
  characterId,
}: {
  groupId?: string;
  campaignId?: string;
  sessionId?: string;
  memberId?: string;
  characterId?: string;
}) => {
  const [data, setData] = useState<{
    group: Group | undefined;
    campaign: Campaign | undefined;
    session: Session | undefined;
    member: Member | undefined;
    character: Character | undefined;
  }>({
    group: undefined,
    campaign: undefined,
    session: undefined,
    member: undefined,
    character: undefined,
  });
  useEffect(() => {
    const fallbackIds: {
      groupId?: string;
      campaignId?: string;
      memberId?: string;
    } = {
      groupId: undefined,
      campaignId: undefined,
      memberId: undefined,
    };
    if (!groupId && (campaignId || sessionId)) {
      fallbackIds.groupId =
        campaignId?.split("-")[0] ?? sessionId?.split("-")[0];
    }
    if (!campaignId && sessionId) {
      fallbackIds.campaignId = sessionId.split("-").slice(0, 2).join("-");
    }

    if (!memberId && characterId) {
      fallbackIds.memberId = characterId.split("-")[0];
    }

    // replace by services
    const groupData = Groups.find(
      ({ id }) => id === (groupId ?? fallbackIds.groupId),
    );
    const campaignData = Campaigns.find(
      ({ id }) => id === (campaignId ?? fallbackIds.campaignId),
    );
    const sessionData = Sessions.find(({ id }) => id === sessionId);

    const memberData = Members.find(
      ({ id }) => id === (memberId ?? fallbackIds.memberId),
    );
    const characterData = Characters.find(({ id }) => id === characterId);

    setData({
      group: groupData,
      campaign: campaignData,
      session: sessionData,
      member: memberData,
      character: characterData,
    });
  }, [groupId, campaignId, sessionId, memberId, characterId]);

  return data;
};
