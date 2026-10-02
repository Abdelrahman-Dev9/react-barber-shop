import { HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import type { ReviewDecision } from "@/data/mock";

type DecisionButtonsProps = {
  value: ReviewDecision;
  onChange: (v: ReviewDecision) => void;
};

export const DecisionButtons = ({ value, onChange }: DecisionButtonsProps) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      aria-label="Reject"
      onClick={() => onChange(value === "rejected" ? "idle" : "rejected")}
      className={cn(
        "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border transition-colors",
        value === "rejected"
          ? "border-[#EF4444] bg-[#EF4444] text-white"
          : "border-[#1A1A1A] bg-white text-[#1A1A1A]",
      )}
    >
      <HiOutlineXMark className="size-[18px] stroke-[2]" />
    </button>
    <button
      type="button"
      aria-label="Approve"
      onClick={() => onChange(value === "approved" ? "idle" : "approved")}
      className={cn(
        "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border transition-colors",
        value === "approved"
          ? "border-[#22C55E] bg-[#22C55E] text-white"
          : "border-[#1A1A1A] bg-[#1A1A1A] text-white",
      )}
    >
      <HiOutlineCheck className="size-[18px] stroke-[2]" />
    </button>
  </div>
);
