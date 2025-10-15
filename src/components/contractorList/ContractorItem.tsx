"use client";

import { useState } from "react";
import { Contractor } from "@/type/contractor";
import ImageModalSlider from "@/components/ImageModalSlider";

import { FaLocationDot } from "react-icons/fa6";
import { HiLink } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import { BsEnvelopeFill, BsPersonFill } from "react-icons/bs";
import Link from "next/link";
import FormContractor from "../FormContractor";
import Image from "next/image";
import { Label } from "../ui/label";

import BadgeVerified from "@/images/badge/chooz_roofers_verified_roofers.png";
import BadgeBestAward from "@/images/badge/chooz_roofers_best_roofers.png";
import BadgeTopAward from "@/images/badge/chooz_roofers_top_roofers.png";

import { useDevice } from "@/hooks/useDevice";
import { format } from "date-fns";
import { Play } from "lucide-react";

const formatUrlPart = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "");

const fallbackImageLogo =
  "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/3fe698e8-af24-4c1d-5610-392140379e00/public";
const fallbackImage =
  "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/6c9c85be-bb9f-469f-7fad-7172060b6200/public";

const ContractorItem = ({ contractor }: { contractor: Contractor }) => {
  const { isMobile } = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReadMore, setIsReadMore] = useState(false);
  const [isReadMoreReview, setIsReadMoreReview] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const hasCompanyImages = contractor.gallery && contractor.gallery.length > 0;
  const fallbackImages = new Array(4).fill(fallbackImage);
  const hasVideo = contractor.video && contractor.video.length > 0;

  let logoImage: string = fallbackImageLogo;

  if (typeof contractor.logo === "string") {
    logoImage = contractor.logo;
  } else if (Array.isArray(contractor.logo)) {
    logoImage = contractor.logo[0]?.url || fallbackImageLogo;
  } else if (contractor.logo && typeof contractor.logo === "object") {
    // @ts-expect-error because logo may be object with url
    logoImage = contractor.logo.url || fallbackImageLogo;
  }

  // ✅ Always strings for gallery
  const galleryImages = hasCompanyImages
    ? contractor.gallery?.map((img) =>
        typeof img === "string" ? img : img.url,
      ) ?? []
    : fallbackImages;

  // ✅ Final array: logo at index 0, gallery after
  const images = [logoImage, ...galleryImages];

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const formattedCategory = formatUrlPart(contractor.category || "");
  const formattedState = formatUrlPart(contractor.state || "");
  const formattedCity = formatUrlPart(contractor.city || "");
  const formattedSlug = contractor.slug || "";

  const maxGalleryImages = hasVideo ? 3 : 4;
  const displayedGalleryImages = images.slice(1).slice(0, maxGalleryImages);

  return (
    <div className="mt-12 shadow-xl border border-gray-200 rounded-2xl p-3 lg:p-10">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10">
        <div className="w-full lg:w-3/4 flex flex-col lg:flex-row justify-start gap-6">
          {isMobile && (
            <div className="flex items-center gap-4 mb-5">
              {contractor.scores
                ?.filter((review) => review.visible)
                .map((score, index) => (
                  <Label
                    key={index}
                    className="text-[22px] bg-[var(--clr-tertiary)] text-white px-4 py-3 font-bold">
                    Score: {score.score} / 100
                  </Label>
                ))}
              {Array.isArray(contractor.awards) &&
                contractor.awards
                  .filter((award) => award.visible)
                  .map((award, index) => (
                    <div key={index}>
                      {contractor.scores?.map((score, i) => (
                        <div key={i}>
                          {score.score >= 94 && (
                            <Image
                              src={BadgeBestAward}
                              alt={`${
                                contractor.title
                              } has been given a Chooz Roofers ${
                                award || "Award"
                              } in gold badge in 2025`}
                              width={85}
                              height={85}
                              priority
                              className="w-[85px] h-[85px] object-contain"
                            />
                          )}
                          {score.score >= 87 && score.score < 94 && (
                            <Image
                              src={BadgeTopAward}
                              alt={`${
                                contractor.title
                              } has been given a Chooz Roofers ${
                                award || "Award"
                              } in silver badge in 2025`}
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
                  ))}
            </div>
          )}
          <Image
            src={
              (Array.isArray(contractor.logo) && contractor.logo[0]?.url) ||
              fallbackImageLogo
            }
            alt={
              (Array.isArray(contractor.logo) && contractor.logo[0]?.alt) ||
              "White Chooz Roofers logo placeholder"
            }
            onClick={() => openModal(0)}
            width={350}
            height={200}
            className="cursor-pointer w-full lg:w-[300px] h-[181px] object-contain rounded-xl"
          />
          <div className="w-full lg:w-[60%]">
            <h2 className="text-[26px] font-extrabold mb-2 font-poppins text-[var(--clr-heading-2)]">
              {contractor.title}
            </h2>
            <ul className="mb-4">
              <li className="flex items-start gap-2 mb-1">
                <FaLocationDot className="text-lg mt-1.5 w-[18px] h-[18px]" />
                <span>
                  {contractor.address && <>{contractor.address}, </>}
                  {contractor.city && <>{contractor.city}, </>}
                  {contractor.state}{" "}
                  {contractor.post_code && <>{contractor.post_code}</>}
                </span>
              </li>
              <li>
                <a
                  href={contractor.website}
                  target="_blank"
                  className="flex items-start gap-2 mb-1">
                  <HiLink className="text-lg mt-1.5 w-[18px] h-[18px]" />
                  <span className="text-blue-700 w-[calc(98%-18px)] break-all">
                    {contractor.website}
                  </span>
                </a>
              </li>
            </ul>
            {!isMobile && (
              <div className="flex items-center gap-4">
                {contractor.scores
                  ?.filter((review) => review.visible)
                  .map((score, index) => (
                    <Label
                      key={index}
                      className="text-[22px] bg-[var(--clr-tertiary)] text-white px-4 py-3 font-bold">
                      Score: {score.score} / 100
                    </Label>
                  ))}
                {Array.isArray(contractor.awards) &&
                  contractor.awards
                    .filter((award) => award.visible)
                    .map((award, index) => (
                      <div key={index}>
                        {contractor.scores?.map((score, i) => (
                          <div key={i}>
                            {score.score >= 94 && (
                              <Image
                                src={BadgeBestAward}
                                alt={`${
                                  contractor.title
                                } has been given a Chooz Roofers ${
                                  award || "Award"
                                } in gold badge in 2025`}
                                width={85}
                                height={85}
                                priority
                                className="w-[85px] h-[85px] object-contain"
                              />
                            )}
                            {score.score >= 87 && score.score < 94 && (
                              <Image
                                src={BadgeTopAward}
                                alt={`${
                                  contractor.title
                                } has been given a Chooz Roofers ${
                                  award || "Award"
                                } in silver badge in 2025`}
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
                    ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <a
            href={`tel:${contractor.company_phone}`}
            target="_blank"
            className="button-blue-border w-full">
            <FaPhoneAlt className="text-lg" />
            {contractor.company_phone}
          </a>
          <div className="flex justify-between gap-4 mt-3">
            <Link
              href={`/${formattedCategory}/${formattedState}/${formattedCity}/${formattedSlug}`}
              className="button-border w-full">
              <BsPersonFill className="text-xl" />
              Profile
            </Link>
            <button
              onClick={() => setIsOpenForm(true)}
              className="button-border w-full cursor-pointer">
              <BsEnvelopeFill className="text-xl" />
              Message
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 bg-[#f5f6f8] border border-gray-100 rounded-2xl p-3 md:p-5 flex flex-col lg:flex-row items-stretch justify-between gap-y-5">
        <div className="flex-1 grid grid-cols-2 gap-4 relative h-full">
          {/* Video Thumbnail */}
          {hasVideo && (
            <div
              onClick={openVideoModal}
              className="relative w-full border border-[#efecf3] rounded-xl h-[115px] bg-black cursor-pointer overflow-hidden group">
              <iframe
                src={contractor.video[0].url}
                title={contractor.video[0].title || "Company Video"}
                className="w-full h-full pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-black ml-0.5" />
                </div>
              </div>
            </div>
          )}

          {displayedGalleryImages.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${contractor.title || "Roofers Company"} gallery image`}
              onClick={() => openModal(idx + 1)}
              width={200}
              height={200}
              className="w-full h-[100px] object-cover rounded-xl cursor-pointer"
            />
          ))}

          {(hasVideo ? images.length > 4 : images.length > 5) && (
            <button
              onClick={() => {
                setCurrentIndex(5 - (hasVideo ? 1 : 0));
                setIsOpen(true);
              }}
              className="cursor-pointer absolute top-1/2 -translate-y-1/2 -right-4 w-[50px] h-[50px] shadow-sm shadow-black/50 rounded-full bg-white/50 text-black backdrop-blur grid place-content-center">
              +{images.length - 5 + (hasVideo ? 1 : 0)}
            </button>
          )}
        </div>

        <div className="hidden lg:block border border-[#e4e5e7] mx-[50px]" />

        {/* About */}
        <div className="flex-1 pt-5 about-text">
          {contractor.description ? (
            <>
              <div
                className={`overflow-hidden ${isReadMore ? "" : "h-[165px]"}`}
                dangerouslySetInnerHTML={{
                  __html: contractor.description.replace(
                    /<h2[^>]*>.*?<\/h2>/gi,
                    "<h2 class='listing-about-title'>About</h2>",
                  ),
                }}></div>

              {contractor.description.split(" ").length > 20 && (
                <button
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="text-blue-600 font-medium cursor-pointer text-[16px]">
                  {isReadMore ? "See less" : "See more"}
                </button>
              )}
            </>
          ) : (
            <>
              <p className="mb-4">
                {contractor.title} - Roofers in {contractor.city} City,{" "}
                {contractor.state}.
              </p>
              <p>Call to request an estimate: {contractor.company_phone}</p>
            </>
          )}
        </div>

        <div className="hidden lg:block border border-[#e4e5e7] mx-[50px]" />

        {isMobile && <hr className="border-[#e4e5e7]" />}

        {/* Reviews & Ratings */}
        <div className="flex-1 md:pt-5 pb-5 md:pb-0">
          <h3 className="heading-contractor">Reviews & Ratings</h3>
          <div className="flex flex-col gap-2 justify-between h-[calc(100%-30px)]">
            <div
              className={
                "space-y-4 overflow-hidden " +
                (isReadMoreReview ? "" : "h-[84px]")
              }>
              {!contractor.google_reviews?.some((review) => review.visible) &&
                !contractor.facebook_reviews?.some(
                  (review) => review.visible,
                ) &&
                !contractor.yelp_reviews?.some((review) => review.visible) &&
                !contractor.angi_reviews?.some((review) => review.visible) &&
                !contractor.homeadvisor_reviews?.some(
                  (review) => review.visible,
                ) &&
                !contractor.bbb_reviews?.some((review) => review.visible) &&
                !contractor.google_review_url && (
                  <p>
                    Reviews will show once the painting company claims this
                    listing page.
                  </p>
                )}

              {/* Google Reviews */}
              {contractor.google_review_url && (
                <div className="flex items-center flex-wrap gap-3">
                  <a
                    href={contractor.google_review_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2672e5] font-medium flex items-center gap-2">
                    Google
                  </a>

                  <div className="flex items-center space-x-2 text-[15px]">
                    <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                      {contractor.google_review_star_rating?.toFixed(1) || "5"}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating =
                          contractor.google_review_star_rating || 0;
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
                      ({contractor.google_review_count || 0} reviews)
                    </span>
                  </div>
                </div>
              )}

              {contractor.google_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
                ))}

              {/* Facebook Reviews */}
              {contractor.facebook_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.yelp_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.angi_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.homeadvisor_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
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
              {contractor.bbb_reviews
                ?.filter((review) => review.visible)
                .map((review, index) => (
                  <div
                    key={index}
                    className="flex items-center flex-wrap gap-3">
                    <a
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2672e5] font-medium flex items-center gap-2">
                      BBB Reviews
                    </a>

                    <div className="flex items-center space-x-2 text-[15px]">
                      <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5 uppercase">
                        {review.grade}
                      </span>
                      <span className="text-gray-700 text-[14px]">
                        Rating |{" "}
                      </span>
                      <span className="font-bold text-[var(--clr-secondary)] text-[14px] mt-0.5">
                        {review.rating}
                      </span>
                      <span className="text-gray-700 text-[14px]">
                        ({review.count} reviews)
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div>
              <button
                onClick={() => setIsReadMoreReview(!isReadMoreReview)}
                className="text-blue-600 font-medium cursor-pointer text-[16px]">
                {isReadMoreReview ? "See less" : "See more"}
              </button>
            </div>

            {contractor.google_reviews?.some((review) => review.visible) ||
            contractor.facebook_reviews?.some((review) => review.visible) ||
            contractor.yelp_reviews?.some((review) => review.visible) ||
            contractor.angi_reviews?.some((review) => review.visible) ||
            contractor.homeadvisor_reviews?.some((review) => review.visible) ||
            contractor.bbb_reviews?.some((review) => review.visible)
              ? contractor.reviews_last_checked && (
                  <p className="text-[11px] text-gray-400">
                    * Reviews Last Checked:{" "}
                    {contractor.reviews_last_checked
                      ? format(
                          new Date(contractor.reviews_last_checked),
                          "MM-dd-yyyy",
                        )
                      : ""}
                  </p>
                )
              : ""}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModalSlider
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={closeModal}
        onPrev={showPrev}
        onNext={showNext}
        goToIndex={setCurrentIndex}
      />

      {/* Video Modal */}
      {isVideoModalOpen && hasVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}>
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
              ✕
            </button>
            <iframe
              src={contractor.video[0].url}
              title={contractor.video[0].title || "Company Video"}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <FormContractor
        isOpen={isOpenForm}
        setIsOpen={setIsOpenForm}
        contractorName={contractor.title || ""}
      />
    </div>
  );
};

export default ContractorItem;
