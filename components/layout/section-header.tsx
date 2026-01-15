import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  return (
    <h2 className={cn(
      "font-heading uppercase tracking-wide text-lg font-medium mb-4",
      className
    )}>
      {children}
    </h2>
  );
}
