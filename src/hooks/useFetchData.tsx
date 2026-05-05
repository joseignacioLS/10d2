import { useEffect, useMemo, useState } from "react";
import { ServiceResponse } from "@/src/types/api";

export const useFetchData = <T,>(
  service: (...args: any) => Promise<ServiceResponse<T>>,
  args: any[],
  onError?: (error: string) => void,
):
  | {
      data: T;
      loading: false;
      error: null;
    }
  | {
      data: null;
      loading: false;
      error: string;
    }
  | {
      data: null;
      loading: true;
      error: null;
    } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>("");

  const memoService = useMemo(async () => await service(...args), [...args]);

  useEffect(() => {
    setError("");
    setData(null);
    memoService
      .then(({ data, error }) => {
        if (error) {
          throw error;
        }
        setData(data);
      })
      .catch((error) => {
        setError(error);
        onError?.(error);
      });
  }, [memoService, onError]);

  if (error) {
    return {
      data: null,
      loading: false,
      error,
    };
  }
  if (data) {
    return {
      data,
      loading: false,
      error: null,
    };
  }
  return {
    data: null,
    loading: true,
    error: null,
  };
};
