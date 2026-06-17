import { ServiceResponse } from "../types/api"

export const secureFetch = async <T>(input: string | URL | Request, init?: RequestInit | undefined): Promise<ServiceResponse<T>> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000)
  try {
    const res = await fetch(input, {
      credentials: "include",
      ...init,
      signal: controller.signal
    })
    if (!res.ok) return {
      data: null,
      error: "Ha habido un error con la request"
    }
    const { status, message, data } = await res.json()
    if (status !== 200) {
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