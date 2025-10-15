import Link from "next/link";

import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { IoLogoGoogleplus } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Contractor } from "@/type/contractor";

import BadgeVerified from "@/images/badge/chooz_roofers_verified_roofers.png";
import BadgeBestAward from "@/images/badge/chooz_roofers_best_roofers.png";
import BadgeTopAward from "@/images/badge/chooz_roofers_top_roofers.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoShareSocialSharp } from "react-icons/io5";
import Image from "next/image";
import { useDevice } from "@/hooks/useDevice";
import { Label } from "../ui/label";

const ContractorHeading = ({ contractor }: { contractor: Contractor }) => {
  const { isMobile } = useDevice();

  return (
    <>
      <h1 className="text-[32px] mb-3 leading-10 lg:leading-12 text-[var(--clr-heading-2)] font-bold font-poppins flex flex-col gap-2">
        {isMobile && (
          <div className="flex items-center gap-4 mb-5">
            {contractor.scores
              ?.filter((score) => score.visible)
              .map((score, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <Label className="text-[19px] bg-[var(--clr-tertiary)] text-white px-4 py-2 font-bold">
                    Score: {score.score} / 100
                  </Label>

                  {score.score >= 94 && (
                    <Image
                      src={BadgeBestAward}
                      alt={`${contractor.title} has been given a Chooz Roofers ${contractor.awards} Award in gold badge in 2025`}
                      width={85}
                      height={85}
                      priority
                      className="w-[85px] h-[85px] object-contain"
                    />
                  )}

                  {score.score >= 87 && score.score < 94 && (
                    <Image
                      src={BadgeTopAward}
                      alt={`${contractor.title} has been given a Chooz Roofers ${contractor.awards} Award in silver badge in 2025`}
                      width={85}
                      height={85}
                      priority
                      className="w-[85px] h-[85px] object-contain"
                    />
                  )}
                  {score.score >= 80 && score.score < 87 && (
                    <Image
                      src={BadgeVerified}
                      priority
                      alt={
                        "Chooz Roofers Certified badge in 2025 for S & M Painter & Drywall Co"
                      }
                      width={78}
                      height={78}
                      className="w-[78px] h-[78px] object-contain"
                    />
                  )}
                </div>
              ))}
          </div>
        )}
        {contractor.title}
      </h1>
      <div className="flex items-start gap-2 mb-3">
        <FaLocationDot className="text-[var(--clr-tertiary)] text-lg mt-1" />
        <span>
          {contractor.city}, {contractor.state}
        </span>
      </div>

      <div className={`flex flex-wrap items-center mb-8 gap-3`}>
        {contractor.company_phone && (
          <Link
            href={`tel:${contractor.company_phone}`}
            className="button-secondary-reverse">
            <FaPhoneAlt />
            <span>{contractor.company_phone}</span>
          </Link>
        )}
        {contractor.website && (
          <Link
            href={contractor.website}
            target="_blank"
            className="button-secondary-reverse"
            aria-label="Website">
            <HiLink className="text-lg" />
          </Link>
        )}
        {contractor.claimed && contractor.facebook && (
          <Link
            href={contractor.facebook}
            target="_blank"
            className="button-secondary-reverse"
            aria-label="Facebook">
            <FaFacebookF className="text-base" />
          </Link>
        )}
        {contractor.claimed && contractor.instagram && (
          <Link
            href={contractor.instagram}
            target="_blank"
            className="button-secondary-reverse"
            aria-label="Instagram">
            <FaInstagram className="text-base" />
          </Link>
        )}
        {contractor.google_bp && (
          <Link
            href={contractor.google_bp}
            target="_blank"
            className="button-secondary-reverse"
            aria-label="Google Business Profile">
            <IoLogoGoogleplus className="text-2xl" />
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center gap-2">
            <IoShareSocialSharp className="text-base" />
            <span>Share</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-300">
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Twitter
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Instagram
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default ContractorHeading;
