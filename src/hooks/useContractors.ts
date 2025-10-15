import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAllContractors, contractorKeys } from "@/utils/getAllContractors";
import type { Contractor } from "@/type/contractor";

export function useContractors(
  options?: Omit<UseQueryOptions<Contractor[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery<Contractor[], Error>({
    queryKey: contractorKeys.all,
    queryFn: getAllContractors,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    ...options,
  });
}
