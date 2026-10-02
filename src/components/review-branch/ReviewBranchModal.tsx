import { useEffect, useState } from "react";
import {
  HiOutlineArrowPath,
  HiOutlineClock,
  HiOutlineXMark,
} from "react-icons/hi2";
import facebookIcon from "@/icons/SVG.svg";
import tiktokIcon from "@/icons/logos_tiktok-icon.png";
import whatsappIcon from "@/icons/selfhst_whatsapp.svg";
import instagramIcon from "@/icons/skill-icons_instagram.svg";
import shopImage from "@/assets/Background+Border.svg";
import idFront from "@/assets/ID Card Front Preview.svg";
import idBack from "@/assets/ID Back Preview.svg";
import utilityBill from "@/assets/Utility Bill Document Preview.svg";
import { DecisionButtons } from "@/components/review-branch/DecisionButtons";
import { cardTone } from "@/components/review-branch/cardTone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  socialLinks,
  type ReviewDecision,
  type SocialLink,
} from "@/data/mock";

type ReviewBranchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const platformIcon: Record<SocialLink["platform"], string> = {
  facebook: facebookIcon,
  tiktok: tiktokIcon,
  whatsapp: whatsappIcon,
  instagram: instagramIcon,
};

const initialSocial: Record<string, ReviewDecision> = {
  fb: "rejected",
  tt: "approved",
  wa: "approved",
  ig: "approved",
};

const initialDocs: Record<string, ReviewDecision> = {
  front: "rejected",
  back: "approved",
  utility: "approved",
};

export const ReviewBranchModal = ({
  open,
  onOpenChange,
}: ReviewBranchModalProps) => {
  const [shop, setShop] = useState<ReviewDecision>("approved");
  const [social, setSocial] =
    useState<Record<string, ReviewDecision>>(initialSocial);
  const [docs, setDocs] = useState<Record<string, ReviewDecision>>(initialDocs);
  const [actionNote, setActionNote] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setShop("approved");
    setSocial(initialSocial);
    setDocs(initialDocs);
    setActionNote(null);
  }, [open]);

  const allApproved =
    shop === "approved" &&
    Object.values(social).every((v) => v === "approved") &&
    Object.values(docs).every((v) => v === "approved");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/25 backdrop-blur-none supports-backdrop-filter:backdrop-blur-none"
        className="!flex max-h-[min(920px,92vh)] w-[min(880px,96vw)] !max-w-[880px] flex-col gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-xl ring-0 sm:!max-w-[880px]"
      >
        <div className="relative flex shrink-0 items-center justify-center px-6 pt-5 pb-3">
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 left-4 flex size-8 cursor-pointer items-center justify-center rounded-[10px] border border-[#EF4444] bg-[#EF4444] text-white"
          >
            <HiOutlineXMark className="size-[18px] stroke-[2]" />
          </button>
          <DialogTitle className="text-center text-xl font-bold text-[#1A1A1A]">
            Review Branch
          </DialogTitle>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pb-2">
          <section className="flex flex-col gap-3">
            <h3 className="text-[11px] font-semibold tracking-[0.08em] text-[#6B7280] uppercase">
              1. Digital Presence &amp; Social Verification
            </h3>

            <div className="flex flex-col gap-4 md:h-[320px] md:flex-row md:items-stretch">
              <div
                className={cn(
                  "flex w-full flex-col overflow-hidden rounded-2xl border-2 md:h-full md:w-[42%]",
                  cardTone(shop),
                )}
              >
                <div className="relative min-h-[220px] flex-1">
                  <img
                    src={shopImage}
                    alt="Shopfront & Interior"
                    className="absolute inset-0 size-full object-cover"
                  />
                  <div className="absolute right-3 bottom-3">
                    <DecisionButtons value={shop} onChange={setShop} />
                  </div>
                </div>
                <p className="shrink-0 px-4 py-3 text-sm font-medium text-[#1A1A1A]">
                  Shopfront &amp; Interior
                </p>
              </div>

              <div className="flex w-full flex-col gap-2.5 md:h-full md:w-[58%]">
                {socialLinks.map((link) => {
                  const decision = social[link.id] ?? "idle";
                  return (
                    <div
                      key={link.id}
                      className={cn(
                        "flex min-h-0 flex-1 items-center gap-3 rounded-2xl border-2 px-3 py-2.5",
                        cardTone(decision),
                      )}
                    >
                      <img
                        src={platformIcon[link.platform]}
                        alt=""
                        className="size-6 shrink-0 object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#1A1A1A]">
                          {link.label}
                        </p>
                        <p className="truncate text-xs text-[#6B7280]">
                          {link.url}
                        </p>
                      </div>
                      <DecisionButtons
                        value={decision}
                        onChange={(v) =>
                          setSocial((prev) => ({ ...prev, [link.id]: v }))
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold tracking-[0.08em] text-[#6B7280] uppercase">
                2. Official Identification &amp; Legal Documents
              </h3>
              <p className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                Click any photo to open
                <HiOutlineClock className="size-3.5" />
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {(
                [
                  { key: "front", label: "ID Front Image", src: idFront },
                  { key: "back", label: "ID Back Image", src: idBack },
                  {
                    key: "utility",
                    label: "Utility Bill Image",
                    src: utilityBill,
                  },
                ] as const
              ).map((doc) => {
                const decision = docs[doc.key] ?? "idle";
                return (
                  <div
                    key={doc.key}
                    className={cn(
                      "flex flex-1 flex-col gap-3 rounded-2xl border-2 border-dashed p-3",
                      cardTone(decision),
                    )}
                  >
                    <button
                      type="button"
                      className="cursor-pointer overflow-hidden rounded-xl"
                      onClick={() => window.open(doc.src, "_blank")}
                    >
                      <img
                        src={doc.src}
                        alt={doc.label}
                        className="h-[140px] w-full object-cover"
                      />
                    </button>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#1A1A1A]">
                        {doc.label}
                      </span>
                      <DecisionButtons
                        value={decision}
                        onChange={(v) =>
                          setDocs((prev) => ({ ...prev, [doc.key]: v }))
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="flex shrink-0 flex-col gap-2 px-6 py-5">
          {!allApproved ? (
            <p className="text-center text-xs text-[#6B7280]">
              Approve every item before activating this branch.
            </p>
          ) : null}
          {actionNote ? (
            <p
              role="status"
              className="text-center text-xs font-medium text-[#166534]"
            >
              {actionNote}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 gap-2 rounded-xl border-[#1A1A1A] bg-white px-5 text-[#1A1A1A] hover:bg-[#F5F5F5]"
              onClick={() => {
                setActionNote("Resubmit request sent");
                window.setTimeout(() => onOpenChange(false), 700);
              }}
            >
              <HiOutlineArrowPath className="size-4" />
              Send &amp; Resubmit
            </Button>
            <Button
              type="button"
              disabled={!allApproved}
              title={
                allApproved
                  ? "Activate branch"
                  : "Approve all items to enable Activate"
              }
              className={cn(
                "h-12 min-w-[140px] rounded-xl px-8 text-white",
                allApproved
                  ? "bg-[#1A1A1A] hover:bg-[#1A1A1A]/90"
                  : "bg-[#9CA3AF] opacity-100",
              )}
              onClick={() => {
                setActionNote("Branch activated");
                window.setTimeout(() => onOpenChange(false), 700);
              }}
            >
              Activate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
