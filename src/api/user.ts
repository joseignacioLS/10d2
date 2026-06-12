import type { ServiceResponse } from "@/src/types/api";
import { Campaign } from "../types/ttrpg";
import { secureFetch } from "./fn";

export const loginRequest = async (
  username: string,
  password: string,
): Promise<ServiceResponse<string>> => {
  const path = "/user/login"
  return secureFetch(process.env.NEXT_PUBLIC_API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: username,
      password
    })
  })

};

export const getUserInfo = async (userId: string): Promise<ServiceResponse<{
  id: string;
  username: string;
  campaigns: Campaign[];
  subscriptions: Campaign["id"][];
}>> => {
  const path = "/user/"
  return secureFetch(process.env.NEXT_PUBLIC_API + path + `${userId}`)
}