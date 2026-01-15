import { getFontsData } from "@/lib/fonts/loader";
import { FontGrid } from "@/components/fonts/font-grid";
import { Separator } from "@/components/ui/separator";
import { LegalNotice } from "@/components/layout/legal-notice";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { DEFAULT_GITHUB_REPOSITORY } from "@/lib/constants";

// Force static rendering for export
export const dynamic = 'force-static';

export default async function HomePage() {
  const fontsData = await getFontsData();

  // For static export, show all fonts on one page
  // In a real app, you could generate multiple static pages
  const fontFamilies = fontsData.families;

  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || DEFAULT_GITHUB_REPOSITORY;
  const githubUrl = `https://github.com/${githubRepo}`;

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">
            Font Library
          </h1>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:flex"
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
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
