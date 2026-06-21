import { ServiceResponse } from "../types/api"

export const secureFetch = async <T>(input: string | URL | Request, init?: RequestInit | undefined): Promise<ServiceResponse<T>> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000)
  try {
    const token = localStorage.getItem("authtoken") ?? "";
    const res = await fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        authToken: token,
      },
      signal: controller.signal
    })
    if (!res.ok) return {
      data: null,
      error: "Ha habido un error con la request"
    }
    const { status, message, data } = await res.json()
    if (status !== 200) {
      if ([401, 403].includes(status)) {
        localStorage.removeItem("authtoken");
      }
      throw message
    }
    return {
      data,
      error: null
    }
  }
  catch (err) {
    return {
      data: null,
      error: String(err)
    }
  }
  finally {
    clearTimeout(timeoutId)
  }
}