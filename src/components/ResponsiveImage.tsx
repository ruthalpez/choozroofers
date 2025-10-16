"use client";

import Image from "next/image";
import RoofersCompanyBuilding from "@/images/buildings/chooz_roofers_company.png";
import RoofersCompanyBuildingMobile from "@/images/buildings/chooz_roofers_company.png";
import { useDevice } from "@/hooks/useDevice";

export default function ResponsiveImage() {
  const { isMobile, isDesktop } = useDevice();

  if (isDesktop) {
    return (
      <Image
        src={RoofersCompanyBuilding.src}
        alt="Illustration of an Roofers company building in the center of a cityscape with residential buildings and skyscrapers in the background"
        width={1000}
        height={1000}
        className="mx-auto w-full"
      />
    );
  }

  if (isMobile) {
    return (
      <Image
        src={RoofersCompanyBuildingMobile.src}
        alt="Illustration of an Roofers company building in the center of a cityscape with residential buildings and skyscrapers in the background"
        width={1000}
        height={1000}
        className="mx-auto w-full"
      />
    );
  }

  return null; // Optional fallback
}
