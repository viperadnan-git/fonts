import { memo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FontFamily } from "@/lib/fonts/types";

interface FontCardProps {
  family: FontFamily;
}

export const FontCard = memo(function FontCard({ family }: FontCardProps) {
  const cssFamilyName = family.mainVariant.cssFamilyName || 'Copernicus';

  return (
    <Link href={`/${family.slug}`} className="focus:outline-none">
      <Card
        className="hover:border-primary transition-all duration-200 cursor-pointer h-full hover:shadow-md hover:-translate-y-0.5 focus-within:outline-none"
        style={{ fontFamily: cssFamilyName }}
      >
        <CardHeader>
          <CardTitle className="text-xl">
            {family.displayName}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {family.variants.length} variant{family.variants.length !== 1 ? 's' : ''}
            {' • '}
            {family.category}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-2xl leading-relaxed">
            {family.previewText}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
});
