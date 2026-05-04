import { Campaigns, Groups, Members } from "../assets/bbdd";
import type { ServiceResponse } from "../types/api";
import { FilledMember } from "../types/ttrpg";

export const loginRequest = async (
  username: string,
  password: string,
): Promise<ServiceResponse<FilledMember>> => {
  return new Promise((resolve) => {
    const member = Members.find(({ name }) => name === username);
    setTimeout(() => {
      if (!member) {
        resolve({
          data: null,
          error: "Error en el login",
        });
        return;
      }
      resolve({
        data: {
          ...member,
          groups: member.groups
            .map((groupId) => Groups.find(({ id }) => id === groupId))
            .filter((v) => v !== undefined),
          campaigns: member.campaigns
            .map((campaignId) => Campaigns.find(({ id }) => id === campaignId))
            .filter((v) => v !== undefined),
        },
        error: null,
      });
    }, 1000);
  });
};

export const getMember = (
  memberId: string,
): Promise<ServiceResponse<FilledMember>> => {
  return new Promise((res) => {
    const member = Members.find(({ id }) => id === memberId);
    if (member) {
      res({
        data: {
          ...member,
          groups: member.groups
            .map((groupId) => Groups.find(({ id }) => id === groupId))
            .filter((v) => v !== undefined),
          campaigns: member.campaigns
            .map((campaignId) => Campaigns.find(({ id }) => id === campaignId))
            .filter((v) => v !== undefined),
        },
        error: null,
      });
      return;
    }
    res({
      data: null,
      error: "No member found",
    });
  });
};
