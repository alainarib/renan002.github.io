import { type DependencyList, useEffect, useState } from "react";

type UseFakeFetchOptions = {
  delay?: number;
  dependencies?: DependencyList;
};

/**
 * Lightweight helper that simulates an async fetch by toggling a loading flag.
 * Useful while real API calls are not wired yet.
 */
export const useFakeFetch = ({ delay = 700, dependencies = [] }: UseFakeFetchOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [...dependencies, delay]);

  return isLoading;
};
