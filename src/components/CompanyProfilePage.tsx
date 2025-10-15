"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { format, isValid, parseISO } from "date-fns";
import { notFound } from "next/navigation";
// Context
import { usePainters } from "@/context/PaintersContext";
// Components
import { FaqAccordion } from "@/components/FaqAccordion";
import ContractorGallery from "@/components/contractorPage/ContractorGallery";
import ContractorHeading from "@/components/contractorPage/ContractorHeading";
import ContractorSidebar from "@/components/contractorPage/ContractorSidebar";
import ProfileSkeleton from "@/components/ProfileSkeleton";
// Hooks
import { useDevice } from "@/hooks/useDevice";
import { Contractor } from "@/type/contractor";

// Types
interface FAQ {
  visible: boolean;
  content: string;
}

interface RouteParams {
  category: string;
  state: string;
  city: string;
  slug: string;
}

// Utility function to safely format dates
const formatDate = (dateString: string | null | undefined): string | null => {
  if (!dateString) return null;

  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MM-dd-yyyy") : null;
  } catch (error) {
    console.warn("Invalid date format:", dateString);
    return null;
  }
};

// Utility function to validate route parameters
const validateRouteParams = (
  params: Partial<RouteParams>,
): params is RouteParams => {
  return !!(params.category && params.state && params.city && params.slug);
};

// Memoized claim listing banner component
const ClaimListingBanner = ({ isMobile }: { isMobile: boolean }) => (
  <Link
    href="/free-directory-listing-offer"
    prefetch={false}
    className={`min-h-[60px] w-full bg-[#ffff00] text-black flex items-center justify-center ${
      isMobile ? "my-4" : "mt-4"
    }`}>
    <p className="font-roboto text-[20px] text-center py-3 px-5">
      Is this your painting company?{" "}
      <span className="underline ml-3">Claim your listing</span>
    </p>
  </Link>
);

// Memoized description section component
const DescriptionSection = ({
  painter,
  formattedDescriptionDate,
}: {
  painter: any;
  formattedDescriptionDate: string | null;
}) => (
  <div className="mt-20">
    {formattedDescriptionDate && (
      <p className="text-[15px] font-bold text-gray-500">
        Updated: {formattedDescriptionDate}
      </p>
    )}
    <div className="about-text">
      {painter.description ? (
        <div
          className="mt-6 space-y-4 max-w-none"
          dangerouslySetInnerHTML={{
            __html: painter.description,
          }}
        />
      ) : (
        <div className="mt-6 space-y-4">
          <p className="mb-6">
            {painter.title} - Roofers in {painter.city} City, {painter.state}.
          </p>
          <p>
            Call to request an estimate:{" "}
            {painter.company_phone || "Contact for estimate"}
          </p>
        </div>
      )}
    </div>
  </div>
);

// Memoized Q&A section component
const QuestionAnswerSection = ({
  painter,
  formattedQADate,
}: {
  painter: any;
  formattedQADate: string | null;
}) => {
  if (!painter.question_answer) return null;

  return (
    <>
      <div className="border-b border-[#bdbdbd] my-14" />
      <div className="space-y-2">
        {formattedQADate && (
          <p className="text-[15px] font-bold text-gray-500">
            Updated: {formattedQADate}
          </p>
        )}
        <div className="about-text">
          <div
            className="space-y-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: painter.question_answer,
            }}
          />
        </div>
      </div>
    </>
  );
};

// Memoized FAQ section component
const FAQSection = ({ painter }: { painter: any }) => {
  const visibleFAQs = useMemo(() => {
    if (!Array.isArray(painter.faq)) return [];
    return painter.faq.filter((f: FAQ) => f && f.visible);
  }, [painter.faq]);

  if (visibleFAQs.length === 0) return null;

  const faqItems = visibleFAQs.map((f: FAQ, i: number) => ({
    id: `faq-${i}`,
    content: f.content || "",
  }));

  return (
    <div className="mt-12 about-text">
      <FaqAccordion items={faqItems} companyName={painter.title || ""} />
    </div>
  );
};

const CompanyProfilePage = ({ painter }: { painter: Contractor }) => {
  const params = useParams() as Partial<RouteParams>;
  const { isMobile } = useDevice();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // const { painter, loading, fetchByCategoryStateCitySlug } = usePainters();

  // Validate and extract route parameters
  const routeParams = useMemo(() => {
    if (validateRouteParams(params)) {
      return params;
    }
    return null;
  }, [params]);

  // Memoized date formatting to prevent recalculation
  const { formattedDescriptionDate, formattedQADate } = useMemo(() => {
    if (!painter) {
      return { formattedDescriptionDate: null, formattedQADate: null };
    }

    return {
      formattedDescriptionDate: formatDate(painter.description_last_edited),
      formattedQADate: formatDate(painter.date_last_updated_qa),
    };
  }, [painter?.description_last_edited, painter?.date_last_updated_qa]);

  // Memoized check for showing claim banner
  const shouldShowClaimBanner = useMemo(() => {
    return painter && !painter.claimed && !painter.not_claimed;
  }, [painter?.claimed, painter?.not_claimed]);

  // Effect to fetch contractor data
  // useEffect(() => {
  //   if (!routeParams || hasInitialized) return;

  //   const { category, state, city, slug } = routeParams;

  //   const fetchData = async () => {
  //     try {
  //       await fetchByCategoryStateCitySlug(category, state, city, slug);
  //       setHasInitialized(true);
  //     } catch (error) {
  //       console.error("Error fetching contractor data:", error);
  //       setHasInitialized(true);
  //       setShowNotFound(true);
  //     }
  //   };

  //   fetchData();
  // }, [routeParams, hasInitialized, fetchByCategoryStateCitySlug]);

  // // Effect to handle not found after loading
  // useEffect(() => {
  //   if (hasInitialized && !loading.painter && !painter) {
  //     const timer = setTimeout(() => setShowNotFound(true), 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [hasInitialized, loading.painter, painter]);

  // Early returns for invalid routes or not found
  if (!routeParams) {
    return notFound();
  }

  if (showNotFound) {
    return notFound();
  }

  if (shouldShowClaimBanner === true) {
    return notFound();
  }

  console.log(!shouldShowClaimBanner);

  // Loading state
  // if (!hasInitialized || loading.painter) {
  //   return (
  //     <div className="container xl:max-w-[1340px] mx-auto px-5 md:pt-10 md:pb-20 py-5">
  //       <ProfileSkeleton />
  //     </div>
  //   );
  // }

  // Show not found if no painter data after initialization
  if (!painter) {
    return notFound();
  }

  // Main render - painter is guaranteed to be non-null here
  return (
    <div className="container xl:max-w-[1340px] mx-auto px-5 md:pt-10 md:pb-20 py-5">
      <div className="flex items-start flex-col lg:flex-row justify-between gap-16 sm:mt-5">
        <div className="w-full">
          <ContractorHeading contractor={painter} />

          {/* Mobile claim banner */}
          {isMobile && shouldShowClaimBanner && (
            <ClaimListingBanner isMobile={true} />
          )}

          <ContractorGallery contractor={painter} />

          {/* Desktop claim banner */}
          {!isMobile && shouldShowClaimBanner && (
            <ClaimListingBanner isMobile={false} />
          )}

          {/* Description and content - desktop only */}
          {!isMobile && (
            <>
              <DescriptionSection
                painter={painter}
                formattedDescriptionDate={formattedDescriptionDate}
              />

              <QuestionAnswerSection
                painter={painter}
                formattedQADate={formattedQADate}
              />

              <FAQSection painter={painter} />
            </>
          )}
        </div>

        <ContractorSidebar painter={painter} />
      </div>
    </div>
  );
};

export default CompanyProfilePage;
