"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook for handling asynchronous requests.
 * @param cb - A callback function that performs the API request.
 */
const useFetch = <T>(cb: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executes the given callback function and manages state accordingly.
   * @param args - Arguments to pass to the callback function.
   */
  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");

      // Handle validation errors (if any)
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        error.response.data.errors.forEach((err: any) => toast.error(err.msg));
      } else {
        toast.error(
          error.response?.data?.error || "An unexpected error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
