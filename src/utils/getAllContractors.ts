import axios from "axios";

const API_URL = "https://choozroofers-api.vercel.app/api/contractors";

export const getAllContractors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching contractors:", error);
    return [];
  }
};

export const contractorKeys = {
  all: ["contractors"] as const,
  lists: () => [...contractorKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...contractorKeys.lists(), { filters }] as const,
  details: () => [...contractorKeys.all, "detail"] as const,
  detail: (id: string) => [...contractorKeys.details(), id] as const,
};
