import { Temporal } from "temporal-polyfill";
import {
  Campaigns,
  Characters,
  Groups,
  Members,
  Sessions,
} from "../assets/bbdd";
import { ServiceResponse } from "../types/api";
import {
  Campaign,
  FilledCampaign,
  FilledCharacter,
  FilledGroup,
  FilledSession,
  Group,
} from "../types/ttrpg";

export const getSearch = (
  search: string,
): Promise<
  ServiceResponse<{
    groups: Group[];
    campaigns: Campaign[];
  }>
> => {
  return new Promise((res) => {
    const result = {
      groups: Groups.filter(({ name }) =>
        new RegExp(search.toLowerCase()).test(name.toLowerCase()),
      ).sort((a, b) => a.lastActivity.since(b.lastActivity).days),
      campaigns: Campaigns.filter(({ name }) =>
        new RegExp(search.toLowerCase()).test(name.toLowerCase()),
      ).sort((a, b) => a.lastActivity.since(b.lastActivity).days),
    };
    res({ data: result, error: null });
  });
};

export const getLastGroups = (
  count: number = 3,
): Promise<ServiceResponse<Group[]>> => {
  return new Promise((res) => {
    const groups = Groups.sort(
      (a, b) => -a.lastActivity.since(b.lastActivity).days,
    ).slice(0, count);
    res({
      data: groups,
      error: null,
    });
  });
};

export const getLastCampaigns = (
  count: number = 3,
): Promise<ServiceResponse<Campaign[]>> => {
  return new Promise((res) => {
    const campaigns = Campaigns.sort(
      (a, b) => -a.lastActivity.since(b.lastActivity).days,
    ).slice(0, count);
    res({
      data: campaigns,
      error: null,
    });
  });
};

export const getLastSessions = (
  count: number = 3,
): Promise<ServiceResponse<FilledSession[]>> => {
  return new Promise((res) => {
    const sessions = Sessions.sort((a, b) => -a.date.since(b.date).days)
      .slice(0, count)
      .map((session) => {
        return {
          ...session,
          campaign: Campaigns.find(({ id }) => id === session.campaign),
          author: Characters.find(({ id }) => id === session.author),
        };
      }) as FilledSession[];
    res({
      data: sessions,
      error: null,
    });
  });
};

export const getGroup = (
  groupId: string,
): Promise<ServiceResponse<FilledGroup>> => {
  return new Promise((res) => {
    const group = Groups.find(({ id }) => id === groupId);
    if (group) {
      const campaigns = group.campaigns
        .map((i) => {
          return Campaigns.find(({ id }) => id === i);
        })
        .filter((v) => v !== undefined);
      const members = group.members
        .map((i) => {
          return Members.find(({ id }) => id === i);
        })
        .filter((v) => v !== undefined);
      res({
        data: {
          ...group,
          campaigns,
          members,
        },
        error: null,
      });
    }
    res({
      data: null,
      error: "No group found",
    });
  });
};

export const postGroup = (name: string): Promise<ServiceResponse<boolean>> => {
  return new Promise((res) => {
    Groups.push({
      id: "23132",
      name,
      members: [],
      campaigns: [],
      state: "inactive",
      creationDate: Temporal.Now.plainDateISO(),
      lastActivity: Temporal.Now.plainDateISO(),
    });
    res({
      data: true,
      error: null,
    });
  });
};

export const getCampaign = (
  campaignId: string,
): Promise<ServiceResponse<FilledCampaign>> => {
  return new Promise((res) => {
    const campaign = Campaigns.find(({ id }) => id === campaignId);
    const group = Groups.find(({ id }) => id === campaign?.id);
    const GM = Members.find(({ id }) => id === campaign?.GM);
    if (!campaign || !group || !GM) {
      res({
        data: null,
        error: "No campaign found",
      });
      return;
    }
    const sessions = campaign.sessions
      .map((i) => {
        return Sessions.find(({ id }) => id === i);
      })
      .filter((v) => v !== undefined);
    const characters = campaign.characters
      .map((i) => {
        return Characters.find(({ id }) => id === i);
      })
      .filter((v) => v !== undefined);
    res({
      data: { ...campaign, group, sessions, GM, characters },
      error: null,
    });
  });
};

export const getSession = (
  sessionId: string,
): Promise<ServiceResponse<FilledSession>> => {
  return new Promise((res) => {
    const session = Sessions.find(({ id }) => id === sessionId);

    const campaign = Campaigns.find(({ id }) => id === session?.campaign);
    const author = Characters.find(({ id }) => id === session?.author);
    if (!session || !campaign || !author) {
      res({
        data: null,
        error: "No session found",
      });
      return;
    }
    res({
      data: { ...session, campaign, author },
      error: null,
    });
  });
};
export const getCharacter = (
  characterId: string,
): Promise<ServiceResponse<FilledCharacter>> => {
  return new Promise((res) => {
    const character = Characters.find(({ id }) => id === characterId);

    const campaign = Campaigns.find(({ id }) => id === character?.campaign);
    const member = Members.find(({ id }) => id === character?.member);

    if (!character || !campaign || !member) {
      res({
        data: null,
        error: "No character found",
      });
      return;
    }
    res({
      data: { ...character, campaign, member },
      error: null,
    });
  });
};
