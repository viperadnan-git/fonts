import { SectionHeader } from "@/components/layout/section-header";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Legal Disclaimer - Font Library",
  description: "Legal information and font usage disclaimer for Font Library.",
};

export default function LegalPage() {
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

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2">
          Legal Disclaimer
        </h1>
        <p className="text-muted-foreground">
          Font usage terms and legal information
        </p>
      </div>

      <Separator className="mb-8" />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <SectionHeader>Font Disclaimer</SectionHeader>
        <p>
          All fonts displayed on this website are provided for <strong>educational and preview purposes only</strong>.
          These fonts have been sourced from various locations including:
        </p>
        <ul>
          <li>Trial versions provided by their respective foundries</li>
          <li>Free fonts distributed under open source licenses</li>
          <li>Public domain typefaces</li>
          <li>Public archives and GitHub repositories</li>
        </ul>

        <SectionHeader className="mt-8">Copyright & Ownership</SectionHeader>
        <p>
          All fonts remain the <strong>exclusive property of their respective copyright holders and foundries</strong>.
          This website is not affiliated with, endorsed by, or associated with the original font creators or foundries.
          All rights, titles, and interests in the fonts belong exclusively to their original authors and copyright holders.
        </p>

        <SectionHeader className="mt-8">Usage Rights</SectionHeader>
        <p>
          The fonts shown on this website are for <strong>preview purposes only</strong>:
        </p>
        <ul>
          <li>Commercial use requires purchasing a proper license from the original foundry</li>
          <li>Users are responsible for ensuring they have appropriate licenses before using any font</li>
          <li>This website does not grant any usage rights or licenses</li>
          <li>Downloading fonts from this site does not convey any rights to use them in projects</li>
        </ul>

        <SectionHeader className="mt-8">DMCA & Legal Protection</SectionHeader>
        <p>
          We respect intellectual property rights and comply with the Digital Millennium Copyright Act (DMCA):
        </p>
        <ul>
          <li>If you are a copyright holder and believe any content infringes your rights, please contact us immediately</li>
          <li>We will promptly investigate and remove any infringing content upon valid request</li>
          <li>All font files are hosted for demonstration and educational purposes only</li>
          <li>We make every effort to respect font licenses and usage terms</li>
        </ul>

        <SectionHeader className="mt-8">Download & Distribution</SectionHeader>
        <p>
          Users who download or use fonts from this website must:
        </p>
        <ul>
          <li>Obtain proper licenses from original foundries for any commercial or production use</li>
          <li>Verify licensing terms before using any font in projects</li>
          <li>Understand that downloading does not grant usage rights</li>
          <li>Respect the intellectual property of font designers and foundries</li>
        </ul>

        <SectionHeader className="mt-8">No Warranty</SectionHeader>
        <p>
          Fonts are provided <strong>&quot;as is&quot;</strong> without warranty of any kind:
        </p>
        <ul>
          <li>We make no guarantees about the quality, completeness, or functionality of any font</li>
          <li>Use fonts at your own risk</li>
          <li>We are not responsible for any issues arising from font usage</li>
          <li>Font files may be incomplete, corrupted, or not suitable for production use</li>
        </ul>

        <SectionHeader className="mt-8">Contact for Licensing</SectionHeader>
        <p>
          For proper licensing and usage rights, please contact the original font foundries directly.
          Each font family page displays metadata that can help you identify the original creator.
        </p>

        <div className="mt-12 p-6 border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground m-0">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground mt-2 m-0">
            By using this website, you acknowledge that you have read, understood, and agree to this disclaimer.
          </p>
        </div>
      </div>
    </>
  );
}
