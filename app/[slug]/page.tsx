import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getFontFamily, getAllFontSlugs } from "@/lib/fonts/loader";
import { Button } from "@/components/ui/button";
import { FontInfo } from "@/components/fonts/font-info";
import { ClientPage } from "./client-page";

interface FontDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllFontSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function FontDetailPage({ params }: FontDetailPageProps) {
  const { slug } = await params;
  const family = await getFontFamily(slug);

  if (!family) {
    notFound();
  }

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2 -ml-4 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
            Back to Library
          </Button>
        </Link>
      </div>

      {/* Font Family Name */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
          {family.displayName}
        </h1>
        <FontInfo family={family} />
      </div>

      {/* Client-side preview controls and variants */}
      <ClientPage family={family} />
    </>
  );
}
