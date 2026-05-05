import { Campaigns, Groups, Members } from "@/src/assets/bbdd";
import type { ServiceResponse } from "@/src/types/api";
import { FilledMember } from "@/src/types/ttrpg";

export const loginRequest = async (
  username: string,
  password: string,
): Promise<ServiceResponse<string>> => {
  return new Promise((resolve) => {
    const member = Members.find(({ name }) => name === username);
    console.log({ member });
    setTimeout(() => {
      if (!member) {
        resolve({
          data: null,
          error: "Error en el login",
        });
        return;
      }
      resolve({
        data: member.id,
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
