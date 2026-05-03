import { useEffect, useMemo, useState } from "react";
import { ServiceResponse } from "../types/api";

export const useFetchData = <T,>(
  service: (...args: any) => Promise<ServiceResponse<T>>,
  args: any[],
  onError?: (error: string) => void,
):
  | {
      data: T;
      loading: boolean;
      error: null;
    }
  | {
      data: null;
      loading: boolean;
      error: string;
    } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const memoService = useMemo(async () => await service(...args), [...args]);

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [memoService, onError]);

  if (error) {
    return {
      data: null,
      loading,
      error,
    };
  }
  if (data) {
    return {
      data,
      loading,
      error: null,
    };
  }
  return {
    data: null,
    loading: true,
    error: "",
  };
};
