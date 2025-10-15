import Image from "next/image";

import ScoringPlatformReviews from "@/images/chooz_hvac_pros_reviews_ratings_platform.png";
import ScoringReviewQualityAndEngagement from "@/images/chooz_hvac_pros_verified_contractors.png";
import CredibitliyAndOperations from "@/images/chooz_hvac_pros_credibility_operations.png";

import BadgeFind from "@/images/badge/chooz_roofers_find_roofers.png";
import BadgeVerified from "@/images/badge/chooz_roofers_verified_roofers.png";
import BadgeBestAward from "@/images/badge/chooz_roofers_best_roofers.png";
import BadgeTopAward from "@/images/badge/chooz_roofers_top_roofers.png";

import ImageBox from "@/components/ImageBox";

const ScoreMethodologyPage = () => {
  return (
    <main>
      <div className="container xl:max-w-[1340px] mx-auto px-5 pt-5 pb-10 space-y-10">
        <div className="container xl:max-w-6xl mx-auto px-5 pt-5 pb-10">
          <div className="py-10">
            <h1 className="md:text-center text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
              The Chooz Roofers Scoring System
            </h1>
            <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[180px] md:max-w-[275px] md:mx-auto my-[30px]" />
            <div className="!space-y-6">
              <p>
                The Chooz Roofers Score is a comprehensive 100-point rating
                evaluating Roofers Contractors across three areas: Platform Reviews
                & Ratings (30 points), Review Quality & Engagement (40 points),
                and Business Credibility & Operations (30 points). Our process
                combines AI analysis with human review by two team members to
                ensure accuracy and fairness. Companies scoring 94-100 points
                earn our Best Painter Award, while those achieving 87-93 points
                receive the Top Painter Award. When you are searching for a
                local Roofers Contractor, we recommend you strongly consider all
                contractors scoring above 80 points.
              </p>
            </div>
            <div className="flex flex-wrap items-center md:items-start justify-center my-10 gap-15 md:gap-0">
              <ImageBox
                image={BadgeFind.src}
                alt="Icon showing three painting company storefronts labeled ABC Roofers, Star Roofers, and XYZ Roofers, representing comparison of local painters"
                heading="Research Painters"
                className="w-[200px]"
              />
              <div className="hidden md:block mt-16 flex-1 border-t-2 border-black border-dashed" />
              <ImageBox
                image={BadgeVerified.src}
                alt="Chooz Roofers Certified Badge for 2025"
                heading="Chooz Roofers Certified"
                className="w-[200px]"
              />
              <div className="hidden md:block mt-16 flex-1 border-t-2 border-black border-dashed" />
              <ImageBox
                image={BadgeTopAward.src}
                alt="Icon of a painter's tool kit inside a hexagon badge, representing an online platform to find local Roofers Contractors"
                heading="Top Painter Award"
                className="w-[200px]"
              />
              <div className="hidden md:block mt-16 flex-1 border-t-2 border-black border-dashed" />
              <ImageBox
                image={BadgeBestAward.src}
                alt="Icon of a painter's tool kit inside a hexagon badge, representing an online platform to find local Roofers Contractors"
                heading="Best Painter Award"
                className="w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Platform Reviews & Ratings (30 Points)
         */}
        <div className="container xl:max-w-6xl mx-auto px-5 py-5">
          <div className="py-10">
            <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
              <div className="w-full lg:w-[60%]">
                <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                  Platform Reviews & Ratings (30 Points)
                </h2>
                <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[275px] my-[30px]" />
                <p>
                  We analyze your star ratings across all major review platforms
                  including Google, Facebook, Yelp, Angi, and Better Business
                  Bureau. Rather than treating all platforms equally, we
                  dynamically weight each platform based on where you actually
                  receive the most reviews over the past two years. This ensures
                  that the platforms where customers most actively share
                  feedback about your work carry the appropriate influence in
                  your overall score.
                </p>
              </div>
              <div className="w-full lg:w-[40%]">
                <Image
                  src={ScoringPlatformReviews.src}
                  alt="Review scoring gauge displaying customer satisfaction levels from 10 to 30 based on platforms like Google, Yelp, Facebook, Angi, BBB, and Instagram"
                  width={500}
                  height={500}
                  className="mr-15 ml-auto md:mr-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Review Quality & Engagement (40 Points)
         */}
        <div className="container xl:max-w-6xl mx-auto px-5 py-5">
          <div className="py-10">
            <div className="flex flex-col lg:flex-row-reverse gap-15 lg:gap-30">
              <div className="w-full lg:w-[60%]">
                <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                  Review Quality & Engagement (40 Points)
                </h2>
                <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[275px] my-[30px]" />
                <p>
                  Beyond simple star counts, we dive deep into what customers
                  actually say about your work. Our analysis examines review
                  sentiment, the depth and specificity of customer feedback, how
                  consistently you receive reviews over time, whether customers
                  include photos of your work, and how effectively you respond
                  to both positive and negative feedback. We also evaluate how
                  well you resolve issues when they arise, as this demonstrates
                  your commitment to customer satisfaction.
                </p>
              </div>
              <div className="w-full lg:w-[40%]">
                <Image
                  src={ScoringReviewQualityAndEngagement.src}
                  alt="Review quality and engagement score visualized with a magnifying glass focusing on a score of 40, surrounded by icons of positive feedback, bridges, data charts, and customer reviews"
                  width={500}
                  height={500}
                  className="mr-15 ml-auto md:mr-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Credibility & Operations (30 Points) */}
        <div className="container xl:max-w-6xl mx-auto px-5 py-5">
          <div className="py-10">
            <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
              <div className="w-full lg:w-[60%]">
                <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                  Business Credibility & Operations (30 Points)
                </h2>
                <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[275px] my-[30px]" />
                <p>
                  We assess the professional foundations that support quality
                  service delivery. This includes your website quality and user
                  experience, proper licensing and insurance coverage, industry
                  certifications and awards, years of proven experience, and how
                  effectively you communicate with both customers and our team.
                  These operational elements help predict the reliability and
                  professionalism customers can expect when working with your
                  company.
                </p>
              </div>
              <div className="w-full lg:w-[40%]">
                <Image
                  src={CredibitliyAndOperations.src}
                  alt="Illustration of business credibility and operations dashboard with website, checklist, calendar, video content, and customer messages"
                  width={500}
                  height={500}
                  className="mr-15 ml-auto md:mr-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ScoreMethodologyPage;
