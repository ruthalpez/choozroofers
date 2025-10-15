"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchContractorServer } from "@/lib/fetch-ontractor-server";
import { Contractor } from "@/type/contractor";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Parameters for fetching a single contractor
interface SingleContractorParams {
  category: string;
  state: string;
  post_code: string;
  city: string;
  slug: string;
}

// The context value type
interface SingleContractorContextValue {
  contractor: Contractor | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
// Create the context with a default value
const SingleContractorContext =
  createContext<SingleContractorContextValue | null>(null);

// Provider component for the single contractor data
export const SingleContractorProvider = ({
  children,
  category,
  state,
  post_code,
  city,
  slug,
  initialData,
}: {
  children: ReactNode;
  initialData?: Contractor | null;
} & SingleContractorParams) => {
  const {
    data: contractor,
    isLoading,
    error,
    refetch,
  } = useQuery<Contractor, Error>({
    queryKey: ["contractor", category, state, post_code, city, slug],
    queryFn: () =>
      fetchContractorServer({ category, state, post_code, city, slug }),
    ...(initialData ? { initialData } : {}),
  });

  const contextValue: SingleContractorContextValue = {
    contractor: contractor || null,
    isLoading,
    error,
    refetch,
  };

  return (
    <SingleContractorContext.Provider value={contextValue}>
      {children}
    </SingleContractorContext.Provider>
  );
};

// Root provider that combines QueryClientProvider and SingleContractorProvider
export const ContractorQueryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Custom hook to use the contractor context
export const useSingleContractor = (): SingleContractorContextValue => {
  const context = useContext(SingleContractorContext);

  if (!context) {
    throw new Error(
      "useSingleContractor must be used within a SingleContractorProvider",
    );
  }

  return context;
};
