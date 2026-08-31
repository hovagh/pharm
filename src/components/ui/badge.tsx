import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border",
  {
    variants: {
      variant: {
        neutral: "bg-gray-100 text-gray-700 border-gray-200",
        primary: "bg-primary-50 text-success-text border-primary-200",
        success: "bg-success-50 text-success-text border-primary-200",
        warning: "bg-warning-50 text-warning-text border-warning-400/40",
        danger: "bg-danger-50 text-danger-text border-danger-400/40",
        info: "bg-info-50 text-info-text border-info-400/40",
        outline: "bg-transparent text-foreground border-border-strong",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
