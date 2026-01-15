import { Badge } from "@/components/ui/badge";
import type { FontFamily } from "@/lib/fonts/types";

interface FontInfoProps {
  family: FontFamily;
}

export function FontInfo({ family }: FontInfoProps) {
  const formats = Array.from(new Set(family.variants.map(v => v.fileExtension.toUpperCase())));

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b">
      <span className="text-sm text-muted-foreground mr-2">
        {family.variants.length} {family.variants.length === 1 ? 'variant' : 'variants'}
      </span>
      <Badge variant="secondary" className="capitalize">
        {family.category}
      </Badge>
      {formats.map(format => (
        <Badge key={format} variant="outline">
          {format}
        </Badge>
      ))}
    </div>
  );
}
