export interface FontVariant {
  name: string;            // From metadata: "Book", "Bold Italic"
  familyName: string;      // Font family name from metadata
  fullName: string;        // Full font name from metadata
  postscriptName: string;  // PostScript name
  fileName: string;        // "CopernicusTrial-Book.ttf"
  filePath: string;        // "/copernicus/..."
  weight: number;          // 100-900 from OS/2 table
  width: number;           // 1-9 (5=normal, <5=condensed, >5=expanded)
  style: 'normal' | 'italic' | 'oblique';
  format: 'truetype' | 'opentype' | 'woff' | 'woff2';
  fileExtension: string;   // "ttf", "otf", etc.
  cssFamilyName?: string;  // Generated unique CSS family name (added by generator)
}

export interface FontFamily {
  id: string;              // Directory name: "copernicus"
  slug: string;            // Same as id for URL: "copernicus"
  name: string;            // From font metadata: "Copernicus Trial"
  displayName: string;     // Formatted display name
  category: string;        // "serif" | "sans-serif" | "monospace" | "display"
  variants: FontVariant[]; // All font files in directory
  mainVariant: FontVariant; // Auto-selected main/regular variant
  previewText: string;     // "The quick brown fox..."
}

export interface FontsData {
  families: FontFamily[];
  totalFonts: number;
  totalFamilies: number;
  lastUpdated: string;
}
