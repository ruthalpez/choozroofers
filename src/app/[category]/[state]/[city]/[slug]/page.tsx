// utils
import {
  RouteParams,
  toTitleCase,
  toUSPS,
  buildContractorUrl,
} from "@/utils/formatters";
import { getByCategoryStateCitySlug } from "@/lib/getAPI";
import CompanyProfilePage from "@/components/CompanyProfilePage";
import { generateSchema } from "./schema";
import Script from "next/script";
import { notFound } from "next/navigation";

// ----- FIXED METADATA -----
export async function generateMetadata({ params }: any) {
  try {
    const { category, state, city, slug } = params;
    if (!category || !state || !city || !slug) notFound();

    const { data: contractor } = await getByCategoryStateCitySlug(
      category,
      state,
      city,
      slug,
    );
    if (!contractor) notFound();

    const cityName = toTitleCase(city);
    const stateCode = toUSPS(state);
    const categoryName = toTitleCase(category.replace("-", " "));
    const fullUrl = buildContractorUrl({ category, state, city, slug });

    const contractorName =
      contractor?.title ||
      contractor?.name ||
      contractor?.company_name ||
      "Professional Painter";

    const title =
      contractor?.seo_title ||
      `${contractorName} | ${categoryName} in ${cityName}, ${stateCode}`;

    const description =
      contractor?.seo_description ||
      `${contractorName} provides professional ${category.replace(
        "-",
        " ",
      )} services in ${cityName}, ${stateCode}. Licensed, insured, and highly rated Roofers Contractor. Get free quotes and read customer reviews.`;

    let robots: { index: boolean; follow: boolean } = {
      index: true,
      follow: true,
    };
    if (
      contractor.status === "inactive" ||
      contractor.hidden === true ||
      contractor.deleted === true ||
      contractor.blocked === true
    ) {
      robots = { index: false, follow: false };
    }

    const ogImage =
      contractor?.company_logo ||
      contractor?.images?.[0]?.url ||
      contractor?.images?.[0] ||
      contractor?.logo?.[0]?.url ||
      "/default-og-image.jpg";

    return {
      title,
      description,
      robots,
      keywords: `${contractorName}, ${categoryName}, ${cityName} ${stateCode}, Roofers Contractor, house painter, commercial painting`,
      openGraph: {
        title,
        description,
        url: fullUrl,
        siteName: "ChoozPainters",
        type: "website",
        locale: "en_US",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: `${contractorName} - ${categoryName} in ${cityName}, ${stateCode}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
      alternates: { canonical: fullUrl },
      other: {
        "geo.region": stateCode,
        "geo.placename": cityName,
        "business.contact_data.locality": cityName,
        "business.contact_data.region": stateCode,
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "ChoozPainters - Professional Roofers Contractors",
      description: "Find professional Roofers Contractors in your area.",
      robots: "index, follow",
    };
  }
}

const Page = async ({ params }: any) => {
  const { category, state, city, slug } = params;
  if (!category || !state || !city || !slug) notFound();

  const { data: contractor } = await getByCategoryStateCitySlug(
    category,
    state,
    city,
    slug,
  );

  if (!contractor) notFound();

  const completeSchema = generateSchema(contractor, {
    category,
    state,
    city,
    slug,
    post_code: contractor.post_code,
  });

  return (
    <>
      {/* GTM */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MKVSM9WX');
      `,
        }}
      />

      {/* JSON-LD */}
      <Script
        id="localbusiness-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(completeSchema) }}
      />

      <main>
        <CompanyProfilePage painter={contractor} />
      </main>
    </>
  );
};

export default Page;
