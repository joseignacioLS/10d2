import { secureFetch } from "@/src/api/fn";
import { ServiceResponse } from "@/src/types/api";

export const loginRequest = async (
  username: string,
  password: string,
): Promise<ServiceResponse<string>> => {
  const path = "/auth/login"
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

export const loginOnTokeRequest = async (
): Promise<ServiceResponse<string>> => {
  const path = "/auth/refresh"
  return secureFetch(process.env.NEXT_PUBLIC_API + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
};

export const logoutRequest = async (): Promise<ServiceResponse<void>> => {
  const path = "/auth/logout"
  return secureFetch(process.env.NEXT_PUBLIC_API + path, {
    method: "POST"
  });
}