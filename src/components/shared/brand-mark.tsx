import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={cn("rounded-md", className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HovaPharm"
    >
      <rect width="28" height="28" rx="7" fill="#2F7D48" />
      <path
        d="M14 7.5V20.5M7.5 14H20.5"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
