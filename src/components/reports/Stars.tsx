import { HiOutlineStar } from "react-icons/hi2";

type StarsProps = {
  rating: number;
};

export const Stars = ({ rating }: StarsProps) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <HiOutlineStar
        key={i}
        className={
          i < rating
            ? "size-4 fill-amber-400 text-amber-400"
            : "size-4 text-[#d1d5db]"
        }
      />
    ))}
  </div>
);
