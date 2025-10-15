const API_URL = "https://choozroofers-api.vercel.app";

export const fetchContractorServer = async ({
  category,
  state,
  post_code,
  city,
  slug,
}: {
  category: string;
  state: string;
  post_code: string;
  city: string;
  slug: string;
}) => {
  try {
    const res = await fetch(
      `${API_URL}/${category}/${state}/${post_code}/${city}/${slug}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      throw new Error("Contractor not found");
    }

    return await res.json();
  } catch (error) {
    console.error("Server fetch error:", error);
    return null;
  }
};
