"use client";

import { useMemo } from "react";
import { useContractors } from "./useContractors";
import { normalizeState } from "@/data/normalizeState";

// Custom hook for filtering contractors by search term
export function useFilteredContractors(searchTerm: string) {
  const { data: contractors = [], isLoading, error } = useContractors();

  const cityStateCounts = useMemo(() => {
    return contractors.reduce((acc, contractor) => {
      if (!contractor.city || !contractor.state) return acc;

      const key = `${contractor.city}, ${contractor.state}`;
      if (!acc[key]) {
        acc[key] = { count: 1, city: contractor.city, state: contractor.state };
      } else {
        acc[key].count += 1;
      }

      return acc;
    }, {} as Record<string, { count: number; city: string; state: string }>);
  }, [contractors]);

  const filteredSuggestions = useMemo(() => {
    return Object.entries(cityStateCounts)
      .filter(([key]) => key.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(([key, value]) => {
        const citySlug = value.city.toLowerCase().replace(/\s+/g, "-");
        const stateSlug = normalizeState(value.state).toLowerCase();
        const category = "roofers-contractor"; // hardcoded or could be passed as a prop
        const url = `/${stateSlug}/${citySlug}/${category}`;

        return {
          key,
          display: `${value.city}, ${normalizeState(
            value.state,
          ).toUpperCase()}`,
          city: value.city,
          state: normalizeState(value.state),
          url,
        };
      });
  }, [cityStateCounts, searchTerm]);

  const getZipMatch = (term: string) => {
    const zipMatch = contractors.find(
      (contractor) =>
        contractor.post_code && contractor.post_code.toString() === term,
    );

    if (zipMatch) {
      const citySlug = zipMatch.city?.toLowerCase().replace(/\s+/g, "-") || "";
      const stateSlug = normalizeState(zipMatch.state || "").toLowerCase();
      const category = "roofers-contractor"; // hardcoded or could be passed as a prop
      const url = `/${stateSlug}/${citySlug}/${category}`;

      return {
        city: zipMatch.city,
        state: normalizeState(zipMatch.state || ""),
        url,
      };
    }

    return null;
  };

  return {
    filteredSuggestions,
    getZipMatch,
    contractors,
    isLoading,
    error,
  };
}
