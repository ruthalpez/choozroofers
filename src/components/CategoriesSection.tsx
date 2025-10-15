import Image from "next/image";

import RoofInstallation from "@/images/categories/chooz_roofers_roof_ installation.png";
import RoofReplacement from "@/images/categories/chooz_roofers_roof_ replacement.png";
import RoofRepair from "@/images/categories/chooz_roofers_roof_repair.png";
import RoofInspection from "@/images/categories/chooz_roofers_roof_ inspection.png";
import SlidinginstallationAndRepair from "@/images/categories/chooz_roofers_sliding_installation-and-reppair.png";
import GutterInstallationAndRepair from "@/images/categories/chooz_roofers_gutter_ installation_and_repair.png";

const categories = [
  {
    title: "Roof Installation",
    image: RoofInstallation,
    alt: "Icon of a paint roller inside a house shape, representing exterior house painting services",
    link: "roof-installation",
  },
  {
    title: "Roof Replacement",
    image: RoofReplacement,
    alt: "Icon of a paintbrush resting in a paint can, representing interior painting services",
    link: "roof-replacement",
  },
  {
    title: "Roof Repair",
    image: RoofRepair,
    alt: "Icon of a spray paint gun applying paint to a striped commercial surface, representing commercial painting services",
    link: "roof-repair",
  },
  {
    title: "Roof Inspection",
    image: RoofInspection,
    alt: "Icon of a cabinet with a paintbrush symbol, representing cabinet painting services",
    link: "roof-inspection",
  },
  {
    title: "Sliding Installation and Repair",
    image: SlidinginstallationAndRepair,
    alt: "Icon of a pressure washer machine with spray wand, representing exterior cleaning and pressure washing services",
    link: "sliding-installation-and-repair",
  },
  {
    title: "Gutter Installation and Repair",
    image: GutterInstallationAndRepair,
    alt: "Icon of a paintbrush applying stain or paint to angled wooden planks, representing deck and fence painting services",
    link: "gutter-installation-and-repair",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center md:justify-between w-full sm:max-w-[500px] lg:max-w-[1340px] mx-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className="bg-white text-center p-[15px] md:shadow-sm w-[130px] md:border border-gray-100 rounded-xl">
          <Image
            src={category.image}
            alt={category.title}
            width={45}
            height={45}
            className="w-full h-[45px] object-contain mb-3"
          />
          <p className="text-sm font-semibold text-center">{category.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
