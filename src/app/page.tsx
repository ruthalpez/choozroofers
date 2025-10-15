import Image from "next/image";
import CategoriesSection from "@/components/CategoriesSection";
import HeroSection from "@/components/HeroSection";
import ResponsiveImage from "@/components/ResponsiveImage";
import ImageBox from "@/components/ImageBox";
import BlogCarousel from "@/components/BlogCarousel";
import JsonLdHead from "@/components/JsonLdHead";

import FloatedBallon from "@/images/floated/chooz_roofers_hot_air_balloon.png";
import ThinkingGirl from "@/images/chooz_roofers_thinking_girl.png";

import BadgeFind from "@/images/badge/chooz_roofers_find_roofers.png";
import BadgeVerified from "@/images/badge/chooz_roofers_verified_roofers.png";
import BadgeBestAward from "@/images/badge/chooz_roofers_best_roofers.png";
import BadgeTopAward from "@/images/badge/chooz_roofers_top_roofers.png";

import VerifiedContractors from "@/images/chooz_roofers_quality_engagement.png";
import RealReviewAnalysis from "@/images/chooz_roofers_real_review-analysis.png";
import AIOptimizedProfiles from "@/images/chooz_roofers_ai_optimized_profiles.png";

const AllStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "choozroofers",
  url: "https://www.choozroofers.com/",
  logo: "https://www.choozroofers.com/images/choozroofers-logo.png",
  description: "Find local painters and painting companies in your area.",
  sameAs: [
    "https://www.facebook.com/choozroofers",
    "https://twitter.com/choozroofers",
    "https://www.linkedin.com/company/choozroofers",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-800-555-1234",
    contactType: "Customer Service",
  },
  knowsAbout: [
    "Roofers",
    "Roofers Services",
    "Home Improvement",
    "Local Contractors",
  ],
};

export default async function Home() {
  return (
    <main>
      <JsonLdHead jsonLd={jsonLd} />

      <HeroSection />

      <div className="container xl:max-w-6xl mx-auto px-5 pt-5 pb-10">
        <div className="py-10">
          <h2 className="md:text-center text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
            Chooz Roofers Directory Standards
          </h2>
          <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[180px] md:max-w-[275px] md:mx-auto my-[30px]" />
          <div className="!space-y-6">
            <p>
              Chooz Roofers specializes in finding, researching, and verifying
              Roofers contractors around the country. Our process ensures that
              you get a snapshot of all of most important information to compare
              Roofers companies in your local area. This ensures that you can
              quickly contact multiple Roofers companies without having to
              waste time searching all over the internet to find the best
              Roofers professionals for your next painting project.
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
          <Image
            src={ThinkingGirl}
            alt="Illustration of a thoughtful person surrounded by abstract network lines and nodes, symbolizing searching and comparing local painters online"
            width={800}
            height={800}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-[#f4f4f4]">
        <div className="container xl:max-w-6xl mx-auto px-5 py-5">
          <div className="py-10">
            <CategoriesSection />
          </div>
        </div>
      </div>

      {/* Verified Contractors */}
      <div className="container xl:max-w-6xl mx-auto px-5 py-5">
        <div className="py-10">
          <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                Verified Contractors
              </h2>
              <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[275px] my-[30px]" />
              <p>
                Every painting company in our directory is verified before being
                listed. After verification, we evaluate each company using our
                Chooz Roofers scoring system, which considers over 40 factors
                including customer reviews, industry experience, and online
                presence. This process helps homeowners find established
                professionals they can trust. For painters, earning our
                certified, top, or best painter award badges helps you stand out
                and build credibility with potential customers.
              </p>
            </div>
            <div className="w-full lg:w-[40%]">
              <Image
                src={VerifiedContractors.src}
                alt="Review scoring gauge displaying customer satisfaction levels from 10 to 30 based on platforms like Google, Yelp, Facebook, Angi, BBB, and Instagram"
                width={500}
                height={500}
                className="mr-15 ml-auto md:mr-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real Review Analysis */}
      <div className="container xl:max-w-6xl mx-auto px-5 py-5">
        <div className="py-10">
          <div className="flex flex-col lg:flex-row-reverse gap-15 lg:gap-30">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                Real Review Analysis
              </h2>
              <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[275px] my-[30px]" />
              <p>
                We go beyond simple star ratings by analyzing reviews across all
                major platforms including Google, Facebook, Yelp, Angi, and
                Better Business Bureau. Our system examines review patterns,
                customer sentiment, response rates, and how contractors handle
                both positive and negative feedback. This comprehensive analysis
                gives homeowners a complete picture of each painter's reputation
                and service quality. For contractors, we help you leverage your
                positive reviews across all platforms, even if most of your
                reviews are concentrated on just one or two sites.
              </p>
            </div>
            <div className="w-full lg:w-[40%]">
              <Image
                src={RealReviewAnalysis.src}
                alt="Review quality and engagement score visualized with a magnifying glass focusing on a score of 40, surrounded by icons of positive feedback, bridges, data charts, and customer reviews"
                width={500}
                height={500}
                className="mr-15 ml-auto md:mr-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Optimized Profiles */}
      <div className="container xl:max-w-6xl mx-auto px-5 py-5">
        <div className="py-10">
          <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                AI-Optimized Profiles
              </h2>
              <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[275px] my-[30px]" />
              <p>
                Your listing isn't just another directory page - it's built
                specifically to be discovered by modern search technology. As
                customers increasingly use AI assistants like ChatGPT,
                Perplexity, and Google's AI Overview to find local services,
                having properly structured data becomes critical. Our profiles
                use schema markup, structured data, and semantic optimization to
                ensure painting companies get recommended by AI systems. This
                forward-thinking approach means you're not just visible today,
                but positioned for how customers will search tomorrow.
              </p>
            </div>
            <div className="w-full lg:w-[40%]">
              <Image
                src={AIOptimizedProfiles.src}
                alt="Illustration of business credibility and operations dashboard with website, checklist, calendar, video content, and customer messages"
                width={500}
                height={500}
                className="mr-15 ml-auto md:mr-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Find Roofers Technicians Near You */}
      <div className="bg-[#f4f4f4]">
        <div className="container xl:max-w-6xl mx-auto px-5 pt-5">
          <div className="py-10 space-y-10">
            <div className="space-y-5 text-center">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                Find Roofers Technicians Near You
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
                vel esse hic vitae cum! Minus magni iure vel aspernatur nemo
                dolore placeat quod veritatis. Et aperiam inventore in.
                Accusamus, corrupti?
              </p>
            </div>
            <div className="columns-3">
              {AllStates.map((state) => (
                <p
                  key={state}
                  className="text-center text-[16px] font-medium font-poppins">
                  {/* <Link
                  href={`/state/${state.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[blue]"> */}
                  {state}
                  {/* </Link> */}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container xl:max-w-6xl mx-auto px-5 pt-5">
        <div className="pt-10">
          <div className="flex flex-col lg:flex-row gap-15 lg:gap-30">
            <div className="w-full lg:w-2/3">
              <h2 className="text-[35px] lg:text-[48px] leading-10 lg:leading-15 text-[var(--clr-heading)] font-medium font-poppins">
                We Help You Find The Top Roofers In Your Area
              </h2>
              <div className="border-b-[3px] border-[var(--clr-tertiary)] max-w-[275px] my-[30px]" />
              <p>
                Part of what makes Chooz Roofers different from other
                directories is that we only gather the information you need to
                make an effective comparison between the Roofers contractors in
                your area. We don’t offer sponsored ads and we only list
                companies based on your geographical search.
              </p>
            </div>
            <div className="w-full lg:w-1/3">
              <Image
                src={FloatedBallon.src}
                alt="Illustration of two people in a blue and white hot air balloon with the Chooz logo, representing Roofers directory exploration and discovery"
                width={300}
                height={300}
                className="mr-15 ml-auto md:mr-auto w-[70px] lg:w-[120px]"
              />
            </div>
          </div>

          <div className="pt-10 md:pt-15">
            <ResponsiveImage />
          </div>
        </div>
      </div>
    </main>
  );
}
