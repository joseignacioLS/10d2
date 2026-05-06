import { ServiceResponse } from "@/src/types/api";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useFetchData = <T,>(
  service: (...args: any) => Promise<ServiceResponse<T>>,
  args: any[],
  onError?: (error: string) => void,
): { refetch: () => Promise<void> } & (
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
    }
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>("");

  const memoService = useCallback(async () => {
    setError("");
    setData(null);
    service(...args)
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
  }, [...args, onError]);

  useEffect(() => {
    memoService();
  }, [memoService]);

  if (error) {
    return {
      data: null,
      loading: false,
      error,
      refetch: memoService,
    };
  }
  if (data) {
    return {
      data,
      loading: false,
      error: null,
      refetch: memoService,
    };
  }
  return {
    data: null,
    loading: true,
    error: null,
    refetch: memoService,
  };
};
