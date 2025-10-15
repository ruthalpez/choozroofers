import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ScoreProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Score = ({ isOpen, setIsOpen }: ScoreProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white h-[95vh] !max-w-[700px] overflow-y-auto">
        <DialogHeader className="">
          <DialogTitle className="text-[26px] font-bold px-4 pt-3">
            Understanding the Chooz Roofers Score
          </DialogTitle>
          <DialogDescription className="space-y-10 p-4">
            <div className="space-y-3">
              <p>
                At Chooz Roofers, we believe property owners (both residential
                and commercial) deserve transparent, data-driven insights when
                selecting a Roofers Contractor. Our proprietary Chooz Roofers
                Score provides a comprehensive assessment that blends objective
                data analysis with subjective quality indicators of painting
                companies based on three critical dimensions: online
                performance, review quality and engagement, and business
                professionalism.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-[22px] font-bold">
                Our Unique Scoring Approach: Blending Technology with Human
                Expertise
              </h2>
              <p>
                In the age of AI, we believe the most accurate and meaningful
                assessments come from combining computational analysis with
                human judgment. Our scoring process begins with sophisticated
                algorithms that analyze vast amounts of data across multiple
                platforms and metrics. However, what sets our system apart is
                that every score is then carefully reviewed and adjusted by two
                different human analysts.
              </p>
              <p>This blended approach ensures:</p>
              <ul className="list-disc pl-5 space-y-4 mb-5">
                <li>
                  Contextual understanding that algorithms alone might miss
                </li>
                <li>
                  Recognition of unique circumstances or exceptional qualities
                </li>
                <li>
                  Fair evaluation of newer businesses or those in transition
                </li>
                <li>
                  Identification of authentic excellence versus manipulated
                  metrics
                </li>
              </ul>
              <p>
                While this creates a more subjective score than purely
                algorithmic systems, we believe this human touch produces
                evaluations that better reflect the real customer experience and
                business quality.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-[22px] font-bold">
                Our Three-Pillar Scoring Framework (100 Points Total)
              </h2>
              <h3 className="text-[18px] font-bold">
                Platform Reviews & Ratings (30 Points)
              </h3>
              <p>
                We analyze review data from multiple platforms including Google,
                Facebook, Yelp, Angi, Better Business Bureau, and other relevant
                review sources. Our dynamic allocation system assigns points
                based on each platform's proportion of a company's total review
                volume, ensuring fair representation regardless of where
                customers choose to share feedback.
              </p>
              <p>
                Our focus is on reviews written within the last two years, as
                these provide the most accurate picture of current service
                quality. Since online reviews have been standard practice for
                many years, many businesses have accumulated scores that may not
                represent their recent performance, and simple review counts
                don't tell the complete story.
              </p>
              <p>
                Every review that offers genuine value to future customers gets
                factored into the score, with recent customer experiences across
                all platforms painting the most complete picture of current
                performance.
              </p>
              <h3 className="text-[18px] font-bold">
                Review Quality & Engagement (40 Points)
              </h3>
              <p>
                This section represents the largest portion of our score because
                we believe the content and context of reviews matter more than
                simple star ratings. In today's fast-paced world, when someone
                takes time to write a detailed, thoughtful review with specific
                project details and photos, it typically signals truly
                exceptional service.
              </p>
              <p>Our comprehensive analysis examines:</p>
              <ul className="list-disc pl-5 mb-5 space-y-4">
                <li>
                  <b>Sentiment Analysis</b> - Overall positive versus negative
                  sentiment across all reviews
                </li>
                <li>
                  <b>Review Distribution</b> - Consistency of reviews across the
                  24-month period
                </li>
                <li>
                  <b>Key Phrase Extraction</b> - Professional language and
                  service-specific terminology
                </li>
                <li>
                  <b>Review Complexity & Specificity</b> - Depth and detail in
                  customer feedback
                </li>
                <li>
                  <b>Project Details Present</b> - Specific information about
                  scope, timeline, and results
                </li>
                <li>
                  <b>Photo Attachments</b> - Visual documentation of completed
                  work
                </li>
                <li>
                  <b>Recent Activity Weighting</b> - Volume and consistency of
                  recent reviews
                </li>
                <li>
                  <b>Review Growth Rate</b> - Momentum in customer feedback
                  generation
                </li>
                <li>
                  <b>Review Response Rate</b> - How often owners engage with
                  customer feedback
                </li>
                <li>
                  <b>Review Response Quality</b> - Professionalism and
                  helpfulness of responses
                </li>
                <li>
                  <b>Negative Review Resolution</b> - How effectively issues are
                  addressed
                </li>
              </ul>
              <p>
                We understand that no company can please every customer, so a
                few negative reviews don't significantly hurt the score. What
                matters more is transparent problem resolution. The most
                valuable scenario is when issues are addressed publicly through
                owner responses, followed by corrective action and customer
                updates reflecting satisfaction with the resolution.
              </p>
              <h3 className="font-poppins text-[25px] mb-5 mt-8 text-[var(--clr-heading)]">
                Business Credibility & Operations (30 Points)
              </h3>
              <p>
                Professional standards and business practices are essential
                indicators of reliability. Our assessment includes:
              </p>
              <p>
                <b>Digital Presence:</b>
              </p>
              <ul className="list-disc pl-5 space-y-4 mb-5">
                <li>Website Existence</li>
                <li>
                  Website Quality Assessment - Including professional design,
                  mobile responsiveness, SEO optimization, ADA compliance, and
                  content quality
                </li>
                <li>Project Gallery/Portfolio</li>
                <li>Contact Form</li>
                <li>Chat Widget/Live Support</li>
              </ul>
              <p>
                <b>Professional Engagement:</b>
              </p>
              <ul className="list-disc pl-5 space-y-4 mb-5">
                <li>Social Media Profiles & Activity</li>
                <li>Google Business Profile Optimization</li>
                <li>
                  <b>Communication & Work with Chooz Roofers</b> - We believe
                  in developing trust through direct communication, awarding
                  points to companies that:
                </li>
                <ul className="list-disc pl-5 space-y-4 mb-5">
                  <li>Respond to our outreach emails</li>
                  <li>Complete their company profile form</li>
                  <li>
                    Participate in a brief phone conversation with our team
                  </li>
                </ul>
              </ul>
              <p>
                <b>Business Credentials:</b>
              </p>
              <ul className="list-disc pl-5 space-y-4">
                <li>Years in Business</li>
                <li>Licensed Status</li>
                <li>Insurance Coverage</li>
                <li>
                  Industry Certifications - Including EPA RRP, PDCA membership,
                  manufacturer certifications, BBB accreditation, and platform
                  awards
                </li>
                <li>Warranty/Guarantee Program</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-[22px] font-bold">
                Excellence Recognition Program
              </h2>
              <p>
                Our badge awards recognize sustained excellence in the painting
                industry. We believe that all companies scoring above 80 points
                should be strongly considered by property owners looking to get
                painting work done, as this threshold represents solid
                performance across our evaluation criteria.
              </p>
              <p>
                <b>Best Painter Award (94-100 points)</b>: Companies achieving
                this elite level receive our Best Painter badge, representing
                the absolute pinnacle of service excellence. These companies
                consistently demonstrate exceptional performance across all
                evaluation criteria.
              </p>
              <p>
                <b>Top Painter Award (87-93 points)</b>: Outstanding companies
                showing strong performance receive our Top Painter recognition,
                indicating superior service quality and professionalism.
              </p>
              <p>
                <b>Growth Opportunity (80-86 points)</b>: Companies in this
                range have demonstrated good performance and meet our standards
                for listing. While they may not yet qualify for our badge
                awards, they represent reliable options for property owners and
                receive personalized feedback to help them reach the next level.
              </p>
              <p>
                <b>Score Not Listed (Below 80 points)</b>: We do not publicly
                display scores below 80 points. However, if these companies want
                our assistance, we provide detailed feedback and specific
                recommendations on how they can improve their score to reach the
                80-point threshold and join our listed contractors.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-[22px] font-bold">
                Partnership for Continuous Improvement
              </h2>
              <p>
                We actively collaborate with painting companies to help them
                understand and enhance their scores. Our team provides specific
                guidance because we've found that higher Chooz Roofers Scores
                directly correlate with:
              </p>

              <ul className="list-disc pl-5 space-y-4 mb-5">
                <li>Increased business revenue</li>
                <li>Higher customer satisfaction rates</li>
                <li>Stronger market positioning</li>
                <li>More sustainable business growth</li>
              </ul>
              <p>Companies with top scores consistently demonstrate:</p>
              <ul className="list-disc pl-5 space-y-4">
                <li>
                  Superior customer service that inspires detailed positive
                  reviews
                </li>
                <li>
                  Professional business practices that build lasting trust
                </li>
                <li>
                  Quality workmanship that customers enthusiastically recommend
                </li>
                <li>
                  Responsive communication and effective problem resolution
                </li>
                <li>Active engagement with industry best practices</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-[22px] font-bold">
                Maintaining Excellence Through Regular Updates
              </h2>
              <p>
                Our scoring methodology undergoes continuous refinement based
                on:
              </p>
              <ul className="list-disc pl-5 space-y-4 mb-5">
                <li>Industry developments and trends</li>
                <li>Customer feedback patterns</li>
                <li>Market dynamics</li>
                <li>Technological advances</li>
                <li>Regulatory changes</li>
              </ul>
              <p>
                We validate our approach against real customer outcomes to
                ensure accuracy and relevance for property owners while
                supporting businesses in achieving their highest potential.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-[22px] font-bold">
                The Chooz Roofers Commitment
              </h2>
              <p>
                The Chooz Roofers Score represents more than just a number—it's
                our commitment to:
              </p>
              <ul className="list-disc pl-5 space-y-4 mb-5">
                <li>
                  Helping property owners find exceptional Roofers Contractors
                  with confidence
                </li>
                <li>
                  Supporting quality businesses in standing out from competitors
                </li>
                <li>
                  Promoting transparency and accountability in the painting
                  industry
                </li>
                <li>
                  Fostering genuine relationships between contractors and our
                  platform
                </li>
                <li>
                  Encouraging continuous improvement and professional
                  development
                </li>
              </ul>
              <p>
                By combining comprehensive data analysis with human expertise
                and direct business engagement, we create a transparent pathway
                to excellence that benefits everyone in the painting industry.
                Our blended approach ensures that deserving companies receive
                recognition while property owners gain access to thoroughly
                vetted, high-quality painting professionals.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Score;
