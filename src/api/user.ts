import type { ServiceResponse } from "@/src/types/api";
import { Campaign } from "../types/ttrpg";
import { secureFetch } from "./fn";

export const getUserInfo = async (): Promise<ServiceResponse<{
  id: string;
  username: string;
  campaigns: {
    id: Campaign["id"],
    role: "GM" | "player"
  }[];
  subscriptions: Campaign["id"][];
}>> => {
  const path = "/user"
  return secureFetch(process.env.NEXT_PUBLIC_API + path)
}
