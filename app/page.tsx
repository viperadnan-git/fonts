import { getFontsData } from "@/lib/fonts/loader";
import { FontGrid } from "@/components/fonts/font-grid";
import { Separator } from "@/components/ui/separator";
import { LegalNotice } from "@/components/layout/legal-notice";

// Force static rendering for export
export const dynamic = 'force-static';

export default async function HomePage() {
  const fontsData = await getFontsData();

  // For static export, show all fonts on one page
  // In a real app, you could generate multiple static pages
  const fontFamilies = fontsData.families;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2">
          Font Library
        </h1>
        <p className="text-muted-foreground">
          Browse {fontsData.totalFamilies} font {fontsData.totalFamilies !== 1 ? 'families' : 'family'} with {fontsData.totalFonts} variants
        </p>
      </div>

      <Separator className="mb-8" />

      <LegalNotice />

      {/* Font Grid */}
      <FontGrid families={fontFamilies} />
    </>
  );
}
