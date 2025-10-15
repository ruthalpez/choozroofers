import { FormData } from "@/app/(pages)/form-survey/page";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepButton from "./StepButton";

interface Step2Props {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  getFieldError: (field: string) => string | undefined;
  OptionCard: any;
}

const SurveyFormStep2: React.FC<Step2Props> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
  getFieldError,
  OptionCard,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-sm font-semibold text-[#fd4b00] mb-3">
        STEP 2 OF 7
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {formData.projectType === "Residential Interior" &&
          "How many rooms need painting?"}
        {formData.projectType === "Residential Exterior" &&
          "What needs painting?"}
        {formData.projectType === "Both Interior & Exterior" &&
          "What's the total scope?"}
        {formData.projectType === "Commercial Property" &&
          "What type of commercial property?"}
        {formData.projectType === "Cabinets/Other" &&
          "What specifically needs painting?"}
      </h2>

      {/* Residential Interior Options */}
      {formData.projectType === "Residential Interior" && (
        <div className="grid gap-3">
          {[
            { value: "1 room", label: "1 room" },
            { value: "2-3 rooms", label: "2-3 rooms" },
            { value: "4-5 rooms", label: "4-5 rooms" },
            { value: "6+ rooms/entire home", label: "6+ rooms/entire home" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              selected={
                formData.projectScopeResidentialInterior === option.value
              }
              onClick={() =>
                updateFormData("projectScopeResidentialInterior", option.value)
              }>
              <span>{option.label}</span>
            </OptionCard>
          ))}
        </div>
      )}

      {/* Residential Exterior Options */}
      {formData.projectType === "Residential Exterior" && (
        <div className="grid gap-3">
          {[
            { value: "Entire house", label: "Entire house" },
            { value: "Partial exterior", label: "Partial exterior" },
            { value: "Just trim/garage", label: "Just trim/garage" },
          ].map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              selected={
                formData.projectScopeResidentialExterior === option.value
              }
              onClick={() =>
                updateFormData("projectScopeResidentialExterior", option.value)
              }>
              <span>{option.label}</span>
            </OptionCard>
          ))}
        </div>
      )}

      {/* Both Interior & Exterior Options */}
      {formData.projectType === "Both Interior & Exterior" && (
        <div className="grid gap-3">
          {[
            {
              value: "Small (1-3 rooms + partial exterior)",
              label: "Small (1-3 rooms + partial exterior)",
            },
            {
              value: "Medium (4-5 rooms + partial exterior)",
              label: "Medium (4-5 rooms + partial exterior)",
            },
            {
              value: "Large (entire home inside and out)",
              label: "Large (entire home inside and out)",
            },
          ].map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              selected={
                formData.projectScopeBothInteriorExterior === option.value
              }
              onClick={() =>
                updateFormData("projectScopeBothInteriorExterior", option.value)
              }>
              <span>{option.label}</span>
            </OptionCard>
          ))}
        </div>
      )}

      {/* Commercial Options */}
      {formData.projectType === "Commercial Property" && (
        <div className="space-y-6">
          <div className="grid gap-3">
            {[
              {
                value: "Office/Professional space",
                label: "Office/Professional space",
              },
              { value: "Retail store", label: "Retail store" },
              {
                value: "Restaurant/Food service",
                label: "Restaurant/Food service",
              },
              { value: "Warehouse/Industrial", label: "Warehouse/Industrial" },
              { value: "Multi-unit property", label: "Multi-unit property" },
            ].map((option) => (
              <OptionCard
                key={option.value}
                value={option.value}
                selected={
                  formData.projectScopeCommercialProperty === option.value
                }
                onClick={() =>
                  updateFormData("projectScopeCommercialProperty", option.value)
                }>
                <span>{option.label}</span>
              </OptionCard>
            ))}
          </div>

          <Select
            value={formData.commercialSize}
            onValueChange={(value) => updateFormData("commercialSize", value)}>
            <SelectTrigger className="text-input !text-[20px]">
              <SelectValue placeholder="Approximate square footage" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200">
              <SelectItem value="Under 2,000 sq ft">
                Under 2,000 sq ft
              </SelectItem>
              <SelectItem value="2,000 - 5,000 sq ft">
                2,000 - 5,000 sq ft
              </SelectItem>
              <SelectItem value="5,000 - 10,000 sq ft">
                5,000 - 10,000 sq ft
              </SelectItem>
              <SelectItem value="Over 10,000 sq ft">
                Over 10,000 sq ft
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Other/Cabinets Options */}
      {formData.projectType === "Cabinets/Other" && (
        <div className="space-y-6">
          <div className="grid gap-3">
            {[
              { value: "Kitchen cabinets", label: "Kitchen cabinets" },
              { value: "Bathroom cabinets", label: "Bathroom cabinets" },
              { value: "Deck/fence", label: "Deck/fence" },
            ].map((option) => (
              <OptionCard
                key={option.value}
                value={option.value}
                selected={formData.projectScopeCabinetsOther === option.value}
                onClick={() =>
                  updateFormData("projectScopeCabinetsOther", option.value)
                }>
                <span>{option.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      <div className="input-group">
        <Label className="text-[20px]">
          Describe your project{" "}
          <span className="optional-label">(optional)</span>
        </Label>
        <Textarea
          className="text-input"
          placeholder="Tell us more about what you need painted..."
          value={formData.projectDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateFormData("projectDescription", e.target.value)
          }
        />
      </div>

      {(getFieldError("projectScopeResidentialInterior") ||
        getFieldError("projectScopeResidentialExterior") ||
        getFieldError("projectScopeBothInteriorExterior") ||
        getFieldError("projectScopeCommercialProperty") ||
        getFieldError("projectScopeCabinetsOther") ||
        getFieldError("commercialSize")) && (
        <div className="text-red-500 text-sm">
          {getFieldError("projectScopeResidentialInterior") ||
            getFieldError("projectScopeResidentialExterior") ||
            getFieldError("projectScopeBothInteriorExterior") ||
            getFieldError("projectScopeCommercialProperty") ||
            getFieldError("projectScopeCabinetsOther") ||
            getFieldError("commercialSize")}
        </div>
      )}

      <StepButton prevStep={prevStep} nextStep={nextStep} label="Next" />
    </div>
  );
};

export default SurveyFormStep2;
