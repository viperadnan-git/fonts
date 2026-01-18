import type { FontFamily, FontVariant } from './types';
import { DEFAULT_GITHUB_REPOSITORY, DEFAULT_GITHUB_BRANCH } from '../constants';

/**
 * Generate CSS @font-face declaration for a single font variant
 */
function generateFontFace(variant: FontVariant, uniqueFamilyName: string): string {
  const { filePath, weight, style, format } = variant;

  // Convert format to CSS format string
  const formatString = format === 'truetype' ? 'truetype' :
                      format === 'opentype' ? 'opentype' :
                      format === 'woff' ? 'woff' :
                      format === 'woff2' ? 'woff2' :
                      'truetype';

  // Get GitHub repo info for CDN URLs
  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || DEFAULT_GITHUB_REPOSITORY;
  const githubBranch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || DEFAULT_GITHUB_BRANCH;

  // Remove leading slash from filePath
  const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;

  // Use jsDelivr CDN for production builds, local paths for development
  const fontUrl = `https://cdn.jsdelivr.net/gh/${githubRepo}@${githubBranch}/public/${cleanPath}`;

  return `@font-face {
  font-family: "${uniqueFamilyName}";
  src: url("${fontUrl}") format("${formatString}");
  font-weight: ${weight};
  font-style: ${style};
  font-display: swap;
}`;
}

/**
 * Generate unique font family name for CSS
 * This prevents browser font matching issues and ensures exact font preview
 */
function generateUniqueFamilyName(variant: FontVariant): string {
  // Use PostScript name or filename without extension
  const baseName = variant.postscriptName || variant.fileName.replace(/\.\w+$/, '');
  // Remove spaces and special characters for CSS
  return baseName.replace(/\s+/g, '');
}

/**
 * Generate base font-face declarations for default UI font (Copernicus)
 */
function generateBaseFonts(families: FontFamily[]): string {
  const fontFaces: string[] = [];

  // Find Copernicus family
  const copernicusFamily = families.find(f =>
    f.displayName.toLowerCase().includes('copernicus')
  );

  if (!copernicusFamily) {
    return '';
  }

  fontFaces.push('/* Base font-face declarations for UI (Copernicus family) */');

  // Define the base variants we need for the UI
  const baseVariants = [
    { weight: 400, style: 'normal', name: 'Book' },
    { weight: 500, style: 'normal', name: 'Medium' },
    { weight: 700, style: 'normal', name: 'Bold' },
    { weight: 900, style: 'normal', name: 'Heavy' },
    { weight: 400, style: 'italic', name: 'BookItalic' },
    { weight: 500, style: 'italic', name: 'MediumItalic' },
    { weight: 700, style: 'italic', name: 'BoldItalic' },
    { weight: 800, style: 'italic', name: 'ExtraboldItalic' },
  ];

  for (const base of baseVariants) {
    // Find matching variant by filename pattern
    const variant = copernicusFamily.variants.find(v =>
      v.fileName.includes(`Trial-${base.name}.`)
    );

    if (variant) {
      fontFaces.push(generateFontFace(variant, 'Copernicus'));
      fontFaces.push('');
    }
  }

  return fontFaces.join('\n');
}

/**
 * Generate fonts.css file with all @font-face declarations
 */
export function generateFontsCSS(families: FontFamily[]): string {
  const fontFaces: string[] = [];

  // Header comment
  fontFaces.push('/* Auto-generated font-face declarations */');
  fontFaces.push('/* Do not edit manually - run bun run fonts:generate */');
  fontFaces.push('');

  // Add base fonts for UI
  const baseFonts = generateBaseFonts(families);
  if (baseFonts) {
    fontFaces.push(baseFonts);
  }

  // Add unique font-face declarations for each variant
  for (const family of families) {
    fontFaces.push(`/* ${family.displayName} - ${family.variants.length} variants (unique families) */`);

    for (const variant of family.variants) {
      const uniqueFamilyName = generateUniqueFamilyName(variant);
      fontFaces.push(generateFontFace(variant, uniqueFamilyName));
      fontFaces.push('');
    }
  }

  return fontFaces.join('\n');
}

/**
 * Add CSS family name to variant metadata for easy reference
 */
export function enrichVariantsWithCSSFamily(families: FontFamily[]): FontFamily[] {
  return families.map(family => {
    const enrichedVariants = family.variants.map(variant => ({
      ...variant,
      cssFamilyName: generateUniqueFamilyName(variant),
    }));

    // Find the enriched version of mainVariant
    const enrichedMainVariant = enrichedVariants.find(
      v => v.fileName === family.mainVariant.fileName
    ) || {
      ...family.mainVariant,
      cssFamilyName: generateUniqueFamilyName(family.mainVariant),
    };

    return {
      ...family,
      variants: enrichedVariants,
      mainVariant: enrichedMainVariant,
    };
  });
}
