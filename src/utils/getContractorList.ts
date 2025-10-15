import axios from "axios";
import { Contractor } from "@/type/contractor";

export async function getContractorList(
  state: string,
  city: string,
  category: string,
): Promise<Contractor[]> {
  try {
    const response = await axios.get(
      `https://choozroofers-api.vercel.app/${encodeURIComponent(
        state,
      )}/${encodeURIComponent(city)}/${encodeURIComponent(category)}`,
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching contractor list:", error);
    return []; // fallback to empty list instead of null
  }
}
