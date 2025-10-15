import axios from "axios";

export const getContractorData = async (
  category: string,
  state: string,
  post_code: string,
  city: string,
  slug: string,
) => {
  try {
    const response = await axios.get(
      `https://choozroofers-api.vercel.app/${category}/${state}/${post_code}/${city}/${slug}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching contractor data:", error);
    return null;
  }
};
