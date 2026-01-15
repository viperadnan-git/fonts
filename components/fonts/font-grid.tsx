import type { FontFamily } from "@/lib/fonts/types";
import { FontCard } from "./font-card";

interface FontGridProps {
  families: FontFamily[];
}

export function FontGrid({ families }: FontGridProps) {
  if (families.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No fonts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {families.map((family) => (
        <FontCard key={family.id} family={family} />
      ))}
    </div>
  );
}
