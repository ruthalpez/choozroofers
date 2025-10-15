"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import ContractorItem from "@/components/contractorList/ContractorItem";
import ContractorListHeading from "@/components/contractorList/ContractorListHeading";
import ContractorListSearch from "@/components/contractorList/ContractorListSearch";
import { usePainters } from "@/context/PaintersContext";
import ListingSkeleton from "@/components/ListingSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const stateAbbreviations = {
  ALABAMA: "AL",
  ALASKA: "AK",
  ARIZONA: "AZ",
  ARKANSAS: "AR",
  CALIFORNIA: "CA",
  COLORADO: "CO",
  CONNECTICUT: "CT",
  DELAWARE: "DE",
  FLORIDA: "FL",
  GEORGIA: "GA",
  HAWAII: "HI",
  IDAHO: "ID",
  ILLINOIS: "IL",
  INDIANA: "IN",
  IOWA: "IA",
  KANSAS: "KS",
  KENTUCKY: "KY",
  LOUISIANA: "LA",
  MAINE: "ME",
  MARYLAND: "MD",
  MASSACHUSETTS: "MA",
  MICHIGAN: "MI",
  MINNESOTA: "MN",
  MISSISSIPPI: "MS",
  MISSOURI: "MO",
  MONTANA: "MT",
  NEBRASKA: "NE",
  NEVADA: "NV",
  "NEW HAMPSHIRE": "NH",
  "NEW JERSEY": "NJ",
  "NEW MEXICO": "NM",
  "NEW YORK": "NY",
  "NORTH CAROLINA": "NC",
  "NORTH DAKOTA": "ND",
  OHIO: "OH",
  OKLAHOMA: "OK",
  OREGON: "OR",
  PENNSYLVANIA: "PA",
  "RHODE ISLAND": "RI",
  "SOUTH CAROLINA": "SC",
  "SOUTH DAKOTA": "SD",
  TENNESSEE: "TN",
  TEXAS: "TX",
  UTAH: "UT",
  VERMONT: "VT",
  VIRGINIA: "VA",
  WASHINGTON: "WA",
  "WEST VIRGINIA": "WV",
  WISCONSIN: "WI",
  WYOMING: "WY",
  "DISTRICT OF COLUMBIA": "DC",
} as const;

const getStateAbbreviation = (stateName: string) => {
  const upperState = stateName.toUpperCase();
  return (
    stateAbbreviations[upperState as keyof typeof stateAbbreviations] ||
    stateName.toUpperCase()
  );
};

// Helper function to format FAQ location for display
const formatLocation = (location: any): string => {
  if (typeof location === "string") {
    return location;
  }

  if (typeof location === "object" && location !== null) {
    const { city, state } = location;
    if (city && state) {
      return `${city}, ${state}`;
    } else if (city) {
      return city;
    } else if (state) {
      return state;
    }
  }

  return "Unknown Location";
};

const CompanyListingPage = () => {
  const { state: stateParams } = useParams() as { state: string };
  const [state, city, category] = stateParams;

  // Add validation for required params
  const isValidRoute = useMemo(() => {
    return state && city && category === "roofers-contractors";
  }, [state, city, category]);

  const [hasInitialized, setHasInitialized] = useState(false);

  // Memoize search term to prevent unnecessary recalculations
  const searchTerm = useMemo(() => {
    if (!city || !state) return "";

    const formattedCity = city
      .replace(/-/g, " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return `${formattedCity}, ${getStateAbbreviation(state)}`;
  }, [city, state]);

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const {
    painters,
    loading,
    pagination,
    fetchByStateCity,
    sortByRating,
    setSortByRating,
    serviceFilter,
    setServiceFilter,
    fetchZipCodes,
    zipCodes,
    allZipCodesData,
    faqs,
    currentState,
    currentCity,
    preloadPageData,
  } = usePainters();

  // Update local search term when searchTerm changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Memoized ZIP code functions to prevent recreation
  const findZipCodeMatch = useCallback(
    (zipCode: string) => {
      if (!allZipCodesData || allZipCodesData.length === 0) {
        return null;
      }

      const match = allZipCodesData.find((zipData) => zipData.zip === zipCode);

      if (match) {
        const citySlug = match.city
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        const stateSlug = match.state
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "");

        return {
          url: `/${stateSlug}/${citySlug}/roofers-contractors`,
          city: match.city,
          state: match.state,
          zip: match.zip,
        };
      }

      return null;
    },
    [allZipCodesData],
  );

  const getZipMatchAsync = useCallback(
    async (term: string) => {
      const zip = term.trim().replace(/\D/g, "");
      if (zip.length === 5) {
        return findZipCodeMatch(zip);
      }
      return null;
    },
    [findZipCodeMatch],
  );

  const getZipMatch = useCallback(
    (term: string) => {
      const zip = term.trim().replace(/\D/g, "");
      if (zip.length === 5) {
        return findZipCodeMatch(zip);
      }
      return null;
    },
    [findZipCodeMatch],
  );

  const goToPage = useCallback(
    (page: number) => {
      if (
        pagination &&
        page >= 1 &&
        page <= pagination.totalPages &&
        state &&
        city
      ) {
        fetchByStateCity(state, city, page, sortByRating, serviceFilter);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pagination, state, city, fetchByStateCity, sortByRating, serviceFilter],
  );

  // Memoized unique FAQ locations
  const uniquefaq_locations = useMemo(() => {
    if (!faqs || faqs.length === 0) return [];

    const allLocations = faqs.flatMap((faq) =>
      Array.isArray(faq.faq_locations) ? faq.faq_locations : [],
    );

    const uniqueLocations = Array.from(
      new Set(allLocations.map((location) => formatLocation(location))),
    );

    return uniqueLocations;
  }, [faqs]);

  // Main initialization effect - only runs once when route is valid
  useEffect(() => {
    if (!isValidRoute || hasInitialized) return;

    const initializePage = async () => {
      try {
        // Only fetch if we're not already on this state/city
        if (currentState !== state || currentCity !== city) {
          await Promise.all([
            fetchByStateCity(state, city, 1, sortByRating, serviceFilter),
            fetchZipCodes(state, city),
          ]);
        }
        setHasInitialized(true);
      } catch (error) {
        console.error("Error initializing page:", error);
        setHasInitialized(true); // Still set to true to prevent infinite loading
      }
    };

    initializePage();
  }, [
    isValidRoute,
    hasInitialized,
    state,
    city,
    currentState,
    currentCity,
    fetchByStateCity,
    fetchZipCodes,
    sortByRating,
    serviceFilter,
  ]);

  // Preload effect - separate from main initialization
  useEffect(() => {
    if (hasInitialized && state && city) {
      preloadPageData?.(state, city);
    }
  }, [hasInitialized, state, city, preloadPageData]);

  // Show 404 for invalid routes
  if (!isValidRoute) {
    return notFound();
  }

  // Show loading state
  if (!hasInitialized || loading.painters) {
    return (
      <div className="container xl:max-w-[1340px] mx-auto md:px-5 px-2 md:py-10 py-5">
        <ListingSkeleton />
      </div>
    );
  }

  // Show 404 if no painters found after loading
  if (hasInitialized && !loading.painters && painters.length === 0) {
    return notFound();
  }

  return (
    <>
      <ContractorListSearch
        getZipMatch={getZipMatch}
        getZipMatchAsync={getZipMatchAsync}
        searchTerm={localSearchTerm}
        setSearchTerm={setLocalSearchTerm}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        sortByRating={sortByRating}
        setSortByRating={setSortByRating}
        zipCodes={zipCodes}
      />

      <div className="container xl:max-w-[1340px] mx-auto md:px-5 px-2 md:py-10 py-5">
        <ContractorListHeading
          contractors={painters}
          total={pagination?.total || 0}
          city={city}
          state={state}
        />

        {painters.map((contractor, index) => (
          <div key={index}>
            <ContractorItem contractor={contractor} />
          </div>
        ))}

        {/* Pagination Component */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => goToPage(pagination.page - 1)}
                    aria-disabled={pagination.page === 1}
                    className={
                      pagination.page === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => goToPage(i + 1)}
                      isActive={pagination.page === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => goToPage(pagination.page + 1)}
                    aria-disabled={pagination.page === pagination.totalPages}
                    className={
                      pagination.page === pagination.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div className="container xl:max-w-[1340px] mx-auto md:px-5 px-2 md:pt-10 md:pb-20 pt-5 pb-14">
          <div className="flex items-start flex-col md:flex-row gap-16">
            <div className="w-full md:w-2/3 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="space-y-4 about-text">
                  <h2 className="text-[26px] font-bold font-poppins">
                    Q&A Based On What Customers Are Saying About Roofers
                    Contractors in {faq.city}, {state.toUpperCase()}
                  </h2>
                  {/* FAQ Pair 1 */}
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="faq-1">
                    {(faq.faq_question_1 || faq.faq_answer_1) && (
                      <AccordionItem value="faq-1">
                        <AccordionTrigger className="text-[26px] font-bold flex px-4 py-3 bg-gray-100">
                          <h3 className="text-[18px] font-semibold font-poppins text-gray-800 !p-0 !m-0">
                            {faq.faq_question_1 || "Question 1"}
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.faq_answer_1 && (
                            <div
                              className="last-text-gray text-[20px]"
                              dangerouslySetInnerHTML={{
                                __html: faq.faq_answer_1,
                              }}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>

                  {/* FAQ Pair 2 */}
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="faq-2">
                    {(faq.faq_question_2 || faq.faq_answer_2) && (
                      <AccordionItem value="faq-2">
                        <AccordionTrigger className="text-[26px] font-bold flex px-4 py-3 bg-gray-100">
                          <h3 className="text-[18px] font-semibold font-poppins text-gray-800 !p-0 !m-0">
                            {faq.faq_question_2 || "Question 2"}
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.faq_answer_2 && (
                            <div
                              className="last-text-gray text-[20px]"
                              dangerouslySetInnerHTML={{
                                __html: faq.faq_answer_2,
                              }}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>

                  {/* FAQ Pair 3 */}
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="faq-3">
                    {(faq.faq_question_3 || faq.faq_answer_3) && (
                      <AccordionItem value="faq-3">
                        <AccordionTrigger className="text-[26px] font-bold flex px-4 py-3 bg-gray-100">
                          <h3 className="text-[18px] font-semibold font-poppins text-gray-800 !p-0 !m-0">
                            {faq.faq_question_3 || "Question 3"}
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.faq_answer_3 && (
                            <div
                              className="last-text-gray text-[20px]"
                              dangerouslySetInnerHTML={{
                                __html: faq.faq_answer_3,
                              }}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>

                  {/* FAQ Pair 4 */}
                  <Accordion type="single" collapsible className="w-full">
                    {(faq.faq_question_4 || faq.faq_answer_4) && (
                      <AccordionItem value="faq-4">
                        <AccordionTrigger className="text-[26px] font-bold flex px-4 py-3 bg-gray-100">
                          <h3 className="text-[18px] font-semibold font-poppins text-gray-800 !p-0 !m-0">
                            {faq.faq_question_4 || "Question 4"}
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.faq_answer_4 && (
                            <div
                              className="last-text-gray text-[20px]"
                              dangerouslySetInnerHTML={{
                                __html: faq.faq_answer_4,
                              }}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>

                  {/* FAQ Pair 5 */}
                  <Accordion type="single" collapsible className="w-full">
                    {(faq.faq_question_5 || faq.faq_answer_5) && (
                      <AccordionItem value="faq-5">
                        <AccordionTrigger className="text-[26px] font-bold flex px-4 py-3 bg-gray-100">
                          <h3 className="text-[18px] font-semibold font-poppins text-gray-800 !p-0 !m-0">
                            {faq.faq_question_5 || "Question 5"}
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.faq_answer_5 && (
                            <div
                              className="last-text-gray text-[20px]"
                              dangerouslySetInnerHTML={{
                                __html: faq.faq_answer_5,
                              }}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              ))}
            </div>

            <div className="w-full md:w-1/3 space-y-4 bg-gray-100 pt-3 pb-8 px-6">
              <h3 className="text-[20px] font-bold font-poppins text-[var(--clr-heading-2)]">
                People also search for Painters in:
              </h3>

              {uniquefaq_locations.length > 0 && (
                <ul className="list-disc pl-5 space-y-2">
                  {uniquefaq_locations.map(
                    (location: string, index: number) => (
                      <li key={index}>
                        <Link
                          href={`/${location
                            .split(", ")[1]
                            ?.toLowerCase()}/${location
                            .split(", ")[0]
                            ?.toLowerCase()
                            .replace(" ", "-")}/roofers-contractors`}
                          className="text-[blue] hover:underline">
                          {location}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyListingPage;
