
export const checkCampaignPermissions = (
  campaigns: {
    id: string;
    role: "GM" | "player"
  }[],
  campaignId: string,
) => {
  const role = campaigns.find(({ id }) => id === campaignId)?.role ?? ""
  const author = ["GM", "player"].includes(role);
  const canEdit = role === "GM"

  return { author, canEdit };
};