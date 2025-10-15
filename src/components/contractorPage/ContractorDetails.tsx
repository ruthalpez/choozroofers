"use client";

import { useSingleContractor } from "@/context/SingleContractorContext";
import ProfileResponsive from "@/components/ProfileResponsive";

export default function ContractorDetails() {
  const { contractor, isLoading, error } = useSingleContractor();

  if (isLoading) {
    return <div className="p-4">Loading contractor details...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!contractor) {
    return <div className="p-4">No contractor found</div>;
  }

  return <ProfileResponsive contractor={contractor} />;
}
