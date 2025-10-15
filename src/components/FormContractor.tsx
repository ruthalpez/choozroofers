"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface FormContractorProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contractorName: string;
}

const FormContractor = ({
  isOpen,
  setIsOpen,
  contractorName,
}: FormContractorProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
    }
  }, [isOpen]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 bg-[var(--clr-tertiary)] text-white border-none">
        <DialogHeader className="p-0 gap-0">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-[var(--clr-tertiary)]">
              <Loader2 className="animate-spin w-8 h-8 text-white" />
            </div>
          )}
          <DialogTitle className="text-[28px] font-extrabold px-22 pt-10">
            Request a quote from {contractorName}
          </DialogTitle>
          <DialogDescription className="p-0 h-[70vh]">
            <iframe
              onLoad={() => setLoading(false)}
              src={`https://api.leadconnectorhq.com/widget/form/EW6N1a3RC0W2io5fvMUB?contractor_name=${encodeURIComponent(
                contractorName,
              )}`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "4px",
                padding: "0 !important",
              }}
              id="inline-EW6N1a3RC0W2io5fvMUB"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Chooz Roofers - Profile Page Customer Submission"
              data-height="1329"
              data-layout-iframe-id="inline-EW6N1a3RC0W2io5fvMUB"
              data-form-id="EW6N1a3RC0W2io5fvMUB"
              title="Chooz Roofers - Profile Page Customer Submission"></iframe>
            <script src="https://link.msgsndr.com/js/form_embed.js"></script>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FormContractor;
