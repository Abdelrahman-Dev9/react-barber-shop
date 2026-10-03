import type { ReviewDecision } from "@/data/mock";

export const cardTone = (value: ReviewDecision) => {
  if (value === "approved") {
    return "border-[#86EFAC] bg-[#F0FDF4]";
  }
  if (value === "rejected") {
    return "border-[#FCA5A5] bg-[#FEF2F2]";
  }
  return "border-[#E5E7EB] bg-white";
};
