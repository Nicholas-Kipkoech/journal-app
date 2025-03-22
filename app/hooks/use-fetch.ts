"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// Disables TypeScript's explicit 'any' rule, allowing 'any' type usage without warnings.

import { useState } from "react";
import { toast } from "sonner"; // Importing 'sonner' for toast notifications

/**
 * Custom hook for handling asynchronous requests.
 * @param cb - A callback function that performs the API request.
 */
const useFetch = (cb: any) => {
  const [data, setData] = useState(undefined);

  const [loading, setLoading] = useState<boolean | null>(null);

  const [error, setError] = useState<any | null>(null);

  /**
   * Executes the given callback function and manages state accordingly.
   * @param args - Arguments to pass to the callback function.
   */
  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await cb(...args); // Execute the provided function
      setData(response);
      setError(null);
    } catch (error: any) {
      setError(error);
      // handle array of errors expecially from validator
      if (
        error.response.data.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(error.response.data.error || "An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
