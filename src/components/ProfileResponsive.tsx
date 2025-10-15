"use client";

import Link from "next/link";

// hooks
import { useDevice } from "@/hooks/useDevice";

// type
import { Contractor } from "@/type/contractor";

// components
import ContractorHeading from "@/components/contractorPage/ContractorHeading";
import ContractorSidebar from "@/components/contractorPage/ContractorSidebar";
import ContractorGallery from "@/components/contractorPage/ContractorGallery";
import ContractorMap from "@/components/contractorPage/ContractorMap";

// components UI
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaqAccordion } from "./FaqAccordion";

interface ProfileResponsiveProps {
  contractor: Contractor;
}

const ProfileResponsive = ({ contractor }: ProfileResponsiveProps) => {
  const { isMobile, isDesktop } = useDevice();

  return (
    <div className="flex items-start flex-col lg:flex-row justify-between gap-16 sm:mt-5">
      <div className="w-full">
        <ContractorHeading contractor={contractor} />

        {isMobile && !contractor.claim_profile && (
          <Link
            href={"/free-directory-listing-offer"}
            prefetch={false}
            className="min-h-[60px] w-full bg-[#ffff00] text-black flex items-center justify-center my-4">
            <p className="font-roboto text-[20px] text-center py-3 px-5">
              Is this your painting company?{" "}
              <span className="underline ml-3">Claim your listing</span>
            </p>
          </Link>
        )}

        <ContractorGallery contractor={contractor} />

        {isDesktop && !contractor.claim_profile && (
          <Link
            href={"/free-directory-listing-offer"}
            prefetch={false}
            className="min-h-[60px] w-full bg-[#ffff00] text-black flex items-center justify-center mt-4">
            <p className="font-roboto text-[20px] text-center py-3 px-5">
              Is this your painting company?{" "}
              <span className="underline ml-3">Claim your listing</span>
            </p>
          </Link>
        )}

        {/* <ContractorTab contractor={contractor} /> */}
        {!isMobile && (
          <div className="mt-20">
            {contractor.description_last_edited && (
              <p className="text-[15px] font-bold text-gray-500">
                Updated: {contractor.description_last_edited}
              </p>
            )}
            <div className="about-text">
              {contractor.description ? (
                <div
                  className="mt-6 space-y-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: contractor.description }}
                />
              ) : (
                <>
                  <p className="mb-6">
                    {contractor.title} - Roofers in {contractor.city} City,{" "}
                    {contractor.state}.
                  </p>
                  <p>Call to request an estimate: {contractor.company_phone}</p>
                </>
              )}
              {contractor.question_answer && (
                <div
                  className="mt-12 space-y-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: contractor.question_answer,
                  }}
                />
              )}
              {Array.isArray(contractor.faq) &&
                contractor.faq.some((f) => f.visible) && (
                  <div className="mt-12">
                    <FaqAccordion
                      items={contractor.faq
                        .filter((f) => f.visible) // only show those marked visible
                        .map((f, i) => ({
                          id: `faq-${i}`,
                          content: f.content,
                        }))}
                      companyName={contractor.title}
                    />
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
      <ContractorSidebar painter={contractor} />
    </div>
  );
};

export default ProfileResponsive;
