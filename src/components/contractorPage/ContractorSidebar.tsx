"use client";

import { useState } from "react";
import { Contractor } from "@/type/contractor";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import FormContractor from "../FormContractor";
import ContractorMap from "./ContractorMap";
import { useDevice } from "@/hooks/useDevice";
import Image from "next/image";
import renderServicesCatalog from "./RenderServicesCatalog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import BadgeVerified from "@/images/badge/chooz_roofers_verified_roofers.png";
import BadgeBestAward from "@/images/badge/chooz_roofers_best_roofers.png";
import BadgeTopAward from "@/images/badge/chooz_roofers_top_roofers.png";

import Score from "../popup/Score";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { FaqAccordion } from "../FaqAccordion";

const ContractorSidebar = ({ painter }: { painter: Contractor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScoreOpen, setIsScoreOpen] = useState(false);
  const { isMobile } = useDevice();
  const [showMore, setShowMore] = useState(false);

  const groupedServiceAreas = painter?.service_area?.reduce((acc, area) => {
    const key = `${area.city}, ${area.state}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(area.zip);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <>
      <aside className="w-full lg:max-w-[408px] space-y-5">
        {/* Score & Awards Section */}
        {!isMobile && (
          <div className="flex items-center gap-4">
            {painter.scores
              ?.filter((review) => review.visible)
              .map((score, index) => (
                <button
                  key={index}
                  onClick={() => setIsScoreOpen(true)}
                  className="font-bold cursor-pointer text-[22px] bg-[var(--clr-tertiary)] text-white px-4 py-3">
                  Score: {score.score} / 100
                </button>
              ))}
            {painter.awards
              ?.filter((award) => award.visible)
              .map((award, index) => (
                <div key={index}>
                  {painter.scores?.map((score, i) => (
                    <div key={i}>
                      {score.score >= 94 && (
                        <Image
                          src={BadgeBestAward}
                          alt={`${painter.title} has been given a Chooz Roofers ${painter.awards} Award in gold badge in 2025`}
                          width={85}
                          height={85}
                          priority
                          className="w-[85px] h-[85px] object-contain"
                        />
                      )}
                      {score.score >= 87 && score.score < 94 && (
                        <Image
                          src={BadgeTopAward}
                          alt={`${painter.title} has been given a Chooz Roofers ${painter.awards} Award in silver badge in 2025`}
                          width={85}
                          height={85}
                          priority
                          className="w-[85px] h-[85px] object-contain"
                        />
                      )}
                      {score.score >= 80 && score.score < 87 && (
                        <Image
                          src={BadgeVerified}
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
              ))}
          </div>
        )}

        {/* Company Details Section Desktop */}
        {!isMobile && (
          <div className="mb-8">
            <h2 className="heading-contractor mt-5">Company Details</h2>
            <ul className="text-[18px]">
              <li className="flex items-start gap-2 mb-3">
                <FaLocationDot className="text-lg mt-1.5 w-[18px] h-[18px]" />
                <span className="w-[calc(100%-18px-0.25rem)]">
                  {painter.address && <>{painter.address}, </>}
                  {painter.city && <>{painter.city}, </>}
                  {painter.state}{" "}
                  {painter.post_code && <>{painter.post_code}</>}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${painter.company_phone}`}
                  className="flex items-start gap-2 mb-3">
                  <FaPhoneAlt className="text-lg mt-1.5 w-[18px] h-[18px]" />
                  <span className="text-blue-700">{painter.company_phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={painter.website}
                  target="_blank"
                  className="flex items-start gap-2 mb-3">
                  <HiLink className="text-lg mt-1.5 w-[18px] h-[18px]" />
                  <span className="text-blue-700 break-all w-[calc(100%-18px-0.25rem)]">
                    {painter.website}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* Contact This Painter */}
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="w-full button-gradient-orange">
            <span>Contact This Painter</span>
            <ChevronRight className="text-white" size={30} />
          </button>
        </div>

        {/* Company Details Section Mobile */}
        {isMobile && (
          <div className="mt-12">
            <h2 className="heading-contractor mt-5">Company Details</h2>
            <ul className="text-[18px]">
              <li className="flex items-start gap-2 mb-3">
                <FaLocationDot className="text-lg mt-1.5 w-[18px] h-[18px]" />
                <span className="w-[calc(100%-18px-0.25rem)]">
                  {painter.address}, {painter.city}, {painter.state}{" "}
                  {painter.post_code}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${painter.company_phone}`}
                  className="flex items-start gap-2 mb-3">
                  <FaPhoneAlt className="text-lg mt-1.5 w-[18px] h-[18px]" />
                  <span className="text-blue-700">{painter.company_phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={painter.website}
                  target="_blank"
                  className="flex items-start gap-2 mb-3">
                  <HiLink className="text-lg mt-1.5 w-[18px] h-[18px]" />
                  <span className="text-blue-700 break-all w-[calc(100%-18px-0.25rem)]">
                    {painter.website}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* Reviews & Ratings Section */}
        <div className="mt-12 mb-8">
          <hr className="mb-8 border-[#bdbdbd]" />
          <h2 className="heading-contractor">Reviews & Ratings</h2>

          <div className="space-y-6">
            {!painter.google_reviews?.some((review) => review.visible) &&
              !painter.facebook_reviews?.some((review) => review.visible) &&
              !painter.yelp_reviews?.some((review) => review.visible) &&
              !painter.angi_reviews?.some((review) => review.visible) &&
              !painter.homeadvisor_reviews?.some((review) => review.visible) &&
              !painter.bbb_reviews?.some((review) => review.visible) &&
              !painter.google_review_url && (
                <p>
                  Reviews will show once the painting company claims this
                  listing page.
                </p>
              )}

            {painter.google_review_url && (
              <div>
                <div className="flex items-center flex-wrap gap-3">
                  <a
                    href={painter.google_review_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2672e5] font-medium flex items-center gap-2">
                    Google
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                      {painter.google_review_star_rating?.toFixed(1) || "5"}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = painter.google_review_star_rating || 0;
                        let fillPercent = 0;

                        if (rating >= star) {
                          fillPercent = 100;
                        } else if (rating + 1 > star) {
                          fillPercent = (rating - (star - 1)) * 100;
                        } // else remains 0

                        const gradientId = `star-gradient-${star}`;

                        return (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 text-[var(--clr-secondary)] stroke-current"
                            fill={`url(#${gradientId})`}>
                            <defs>
                              <linearGradient id={gradientId}>
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="currentColor"
                                />
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="transparent"
                                />
                              </linearGradient>
                            </defs>
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
                          </svg>
                        );
                      })}
                    </div>
                    <span className="text-gray-700 text-[14px]">
                      ({painter.google_review_count || 0} reviews)
                    </span>
                  </div>
                </div>
                {painter.google_review_title && (
                  <p className="text-[11px] text-gray-400">
                    {painter.google_review_title}
                  </p>
                )}
              </div>
            )}
            {/* Google Reviews */}
            {painter.google_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index}>
                  <div className="flex items-center flex-wrap gap-3">
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2672e5] font-medium flex items-center gap-2">
                      Google
                    </a>

                    <div className="flex items-center space-x-2 text-[15px]">
                      <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                        {review.rating?.toFixed(1) || "5"}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const rating = review.rating || 0;
                          let fillPercent = 0;

                          if (rating >= star) {
                            fillPercent = 100;
                          } else if (rating + 1 > star) {
                            fillPercent = (rating - (star - 1)) * 100;
                          } // else remains 0

                          const gradientId = `star-gradient-${star}`;

                          return (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="h-4 w-4 text-[var(--clr-secondary)] stroke-current"
                              fill={`url(#${gradientId})`}>
                              <defs>
                                <linearGradient id={gradientId}>
                                  <stop
                                    offset={`${fillPercent}%`}
                                    stopColor="currentColor"
                                  />
                                  <stop
                                    offset={`${fillPercent}%`}
                                    stopColor="transparent"
                                  />
                                </linearGradient>
                              </defs>
                              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
                            </svg>
                          );
                        })}
                      </div>
                      <span className="text-gray-700 text-[14px]">
                        ({review.count || 0} reviews)
                      </span>
                    </div>
                  </div>
                  {review.title && (
                    <p className="text-[11px] text-gray-400">{review.title}</p>
                  )}
                </div>
              ))}

            {/* Facebook Reviews */}
            {painter.facebook_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2672e5] font-medium flex items-center gap-2">
                    Facebook
                  </a>

                  {review.recommended && (
                    <p className="!mb-0 text-sm">
                      <span className="text-[var(--clr-secondary)] font-bold">
                        {review.recommended}%
                      </span>{" "}
                      Recommended (<span>{review.count}</span> Reviews)
                    </p>
                  )}
                </div>
              ))}

            {/* Yelp Reviews */}
            {painter.yelp_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2672e5] font-medium flex items-center gap-2">
                    Yelp
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                      {review.rating.toFixed(1) || "5"}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = review.rating || 0;
                        let fillPercent = 0;

                        if (rating >= star) {
                          fillPercent = 100;
                        } else if (rating + 1 > star) {
                          fillPercent = (rating - (star - 1)) * 100;
                        }

                        // Ensure unique gradient ID
                        const gradientId = `star-gradient-yelp-${index}-${star}`;

                        return (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 text-[var(--clr-secondary)] stroke-current"
                            fill={`url(#${gradientId})`}>
                            <defs>
                              <linearGradient id={gradientId}>
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="currentColor"
                                />
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="transparent"
                                />
                              </linearGradient>
                            </defs>
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
                          </svg>
                        );
                      })}
                    </div>
                    <span className="text-gray-700 text-[14px]">
                      ({review.count} reviews)
                    </span>
                  </div>
                </div>
              ))}

            {/* Angi Reviews */}
            {painter.angi_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2672e5] font-medium flex items-center gap-2">
                    Angi
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                      {review.rating.toFixed(1) || "5"}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = review.rating || 0;
                        let fillPercent = 0;

                        if (rating >= star) {
                          fillPercent = 100;
                        } else if (rating + 1 > star) {
                          fillPercent = (rating - (star - 1)) * 100;
                        }

                        // Ensure unique gradient ID
                        const gradientId = `star-gradient-yelp-${index}-${star}`;

                        return (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 text-[var(--clr-secondary)] stroke-current"
                            fill={`url(#${gradientId})`}>
                            <defs>
                              <linearGradient id={gradientId}>
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="currentColor"
                                />
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="transparent"
                                />
                              </linearGradient>
                            </defs>
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
                          </svg>
                        );
                      })}
                    </div>
                    <span className="text-gray-700 text-[14px]">
                      ({review.count} reviews)
                    </span>
                  </div>
                </div>
              ))}

            {/* HomeAdvisor Reviews */}
            {painter.homeadvisor_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2672e5] font-medium flex items-center gap-2">
                    HomeAdvisor
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                      {review.rating.toFixed(1) || "5"}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = review.rating || 0;
                        let fillPercent = 0;

                        if (rating >= star) {
                          fillPercent = 100;
                        } else if (rating + 1 > star) {
                          fillPercent = (rating - (star - 1)) * 100;
                        }

                        // Ensure unique gradient ID
                        const gradientId = `star-gradient-yelp-${index}-${star}`;

                        return (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 text-[var(--clr-secondary)] stroke-current"
                            fill={`url(#${gradientId})`}>
                            <defs>
                              <linearGradient id={gradientId}>
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="currentColor"
                                />
                                <stop
                                  offset={`${fillPercent}%`}
                                  stopColor="transparent"
                                />
                              </linearGradient>
                            </defs>
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
                          </svg>
                        );
                      })}
                    </div>
                    <span className="text-gray-700 text-[14px]">
                      ({review.count} reviews)
                    </span>
                  </div>
                </div>
              ))}

            {/* BBB Reviews */}
            {painter.bbb_reviews
              ?.filter((review) => review.visible)
              .map((review, index) => (
                <div key={index} className="flex items-center flex-wrap gap-3">
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2672e5] font-medium flex items-center gap-2">
                    BBB
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5 uppercase">
                      {review.grade}
                    </span>
                    <span className="text-gray-700 text-[14px]">
                      Rating{review.rating > 0 && " |"}
                    </span>
                    {review.rating > 0 && (
                      <>
                        <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                          {review.rating.toFixed(1) || "5"}
                        </span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const rating = review.rating || 0;
                            let fillPercent = 0;

                            if (rating >= star) {
                              fillPercent = 100;
                            } else if (rating + 1 > star) {
                              fillPercent = (rating - (star - 1)) * 100;
                            }

                            // Ensure unique gradient ID
                            const gradientId = `star-gradient-yelp-${index}-${star}`;

                            return (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 text-[var(--clr-secondary)] stroke-current"
                                fill={`url(#${gradientId})`}>
                                <defs>
                                  <linearGradient id={gradientId}>
                                    <stop
                                      offset={`${fillPercent}%`}
                                      stopColor="currentColor"
                                    />
                                    <stop
                                      offset={`${fillPercent}%`}
                                      stopColor="transparent"
                                    />
                                  </linearGradient>
                                </defs>
                                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.21l8.2-1.192z" />
                              </svg>
                            );
                          })}
                        </div>
                        <span className="text-gray-700 text-[14px]">
                          ({review.count} reviews)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}

            {painter.google_reviews?.some((review) => review.visible) ||
            painter.facebook_reviews?.some((review) => review.visible) ||
            painter.yelp_reviews?.some((review) => review.visible) ||
            painter.angi_reviews?.some((review) => review.visible) ||
            painter.homeadvisor_reviews?.some((review) => review.visible) ||
            painter.bbb_reviews?.some((review) => review.visible)
              ? painter.reviews_last_checked && (
                  <p className="text-[11px] text-gray-400">
                    * Reviews Last Checked:{" "}
                    {painter.reviews_last_checked
                      ? format(
                          new Date(painter.reviews_last_checked),
                          "MM-dd-yyyy",
                        )
                      : ""}
                  </p>
                )
              : ""}
          </div>
        </div>

        {/* About Section Mobile */}
        {isMobile && (
          <div className="mt-8 mb-12 about-text">
            <hr className="mb-4 border-[#bdbdbd]" />
            {painter.description_last_edited && (
              <p className="text-[15px] font-bold text-gray-500 mt-8">
                Updated:{" "}
                {painter.description_last_edited
                  ? format(
                      new Date(painter.description_last_edited),
                      "MM-dd-yyyy",
                    )
                  : ""}
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
                <>
                  <p className="mb-6">
                    {painter.title} - Roofers in {painter.city} City,{" "}
                    {painter.state}.
                  </p>
                  <p>Call to request an estimate: {painter.company_phone}</p>
                </>
              )}

              {painter.question_answer && (
                <div className="border-b border-[#bdbdbd] my-14" />
              )}

              {painter.question_answer && (
                <div className=" space-y-2">
                  {painter.date_last_updated_qa && (
                    <p className="text-[15px] font-bold text-gray-500">
                      Updated:{" "}
                      {painter.date_last_updated_qa
                        ? format(
                            new Date(painter.date_last_updated_qa),
                            "MM-dd-yyyy",
                          )
                        : ""}
                    </p>
                  )}

                  <div
                    className=" space-y-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: painter.question_answer,
                    }}
                  />
                </div>
              )}
              {Array.isArray(painter.faq) &&
                painter.faq.some((f) => f.visible) && (
                  <div className="mt-12">
                    <FaqAccordion
                      items={painter.faq
                        .filter((f) => f.visible) // only show those marked visible
                        .map((f, i) => ({
                          id: `faq-${i}`,
                          content: f.content,
                        }))}
                      companyName={painter.title}
                    />
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Services Section */}
        {renderServicesCatalog({
          contractorServices: painter.services || [],
        })}

        {/* Service Area Section */}

        <div>
          <hr className="mb-8 border-[#bdbdbd]" />
          <h2 className="heading-contractor">Service Area</h2>
          {painter.service_area?.length ? (
            <>
              <Accordion type="multiple" className="w-full">
                {(showMore
                  ? Object.entries(groupedServiceAreas || {})
                  : Object.entries(groupedServiceAreas || {}).slice(0, 4)
                ).map(([location, zips], index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="mb-2">
                    <AccordionTrigger className="text-left text-[15px] font-bold">
                      <Link
                        href={`/${location
                          .split(", ")[1]
                          .toLowerCase()}/${location
                          .split(", ")[0]
                          .toLowerCase()
                          .replace(" ", "-")}/roofers-contractors`}>
                        {location}
                      </Link>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-4 text-[15px] space-y-3 flex flex-wrap gap-x-8">
                        {zips.map((zip, i) => (
                          <li key={i}>{zip}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {Object.entries(groupedServiceAreas || {}).length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowMore((prev) => !prev)}
                  className="text-sm font-bold text-[#007bff] hover:text-[#0056b3] focus:outline-none cursor-pointer mt-2">
                  {showMore ? "See less" : "See all"}
                </button>
              )}
            </>
          ) : (
            <p>
              Service Area will show once the painting company claims this
              listing page.
            </p>
          )}
        </div>

        <hr className="my-10 border-[#bdbdbd]" />

        {/* Map Section  */}
        <ContractorMap painter={painter} />

        {/* Disclaimer Section */}
        <div className="mt-12">
          <hr className="mb-4 border-[#bdbdbd]" />
          <h3 className="heading-contractor">DISCLAIMER</h3>
          <p className="text-xs">
            This site is a free service to assist homeowners in connecting with
            local service contractors. All contractors are independent and this
            site does not warrant or guarantee any work performed. It is the
            responsibility of the homeowner to verify that the hired contractor
            furnishes the necessary license and insurance required for the work
            being performed.
          </p>
          {painter.claimed && (
            <p className="text-xs">
              <span className="text-red-700 text-[15px]">*</span> We post the
              date of the last review check, and we do our best to keep these
              Google review statistics, up-to-date and accurate. However, if you
              want want completely accuracy, click on Google button to go
              directly to that painting company’s review profile.
            </p>
          )}
        </div>
      </aside>

      <FormContractor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        contractorName={painter.title || ""}
      />

      <Score isOpen={isScoreOpen} setIsOpen={setIsScoreOpen} />
    </>
  );
};

export default ContractorSidebar;
