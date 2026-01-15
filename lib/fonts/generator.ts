import type { FontFamily, FontVariant } from './types';

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

  // Use relative path for basePath compatibility
  // Remove leading slash to make it relative (e.g., /copernicus/font.ttf -> copernicus/font.ttf)
  const relativePath = filePath.startsWith('/') ? filePath.substring(1) : filePath;

  return `@font-face {
  font-family: "${uniqueFamilyName}";
  src: url("${relativePath}") format("${formatString}");
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
 * Generate fonts.css file with all @font-face declarations
 */
export function generateFontsCSS(families: FontFamily[]): string {
  const fontFaces: string[] = [];

  // Header comment
  fontFaces.push('/* Auto-generated font-face declarations */');
  fontFaces.push('/* Do not edit manually - run bun run fonts:generate */');
  fontFaces.push('');

  for (const family of families) {
    fontFaces.push(`/* ${family.displayName} - ${family.variants.length} variants */`);

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
  return families.map(family => ({
    ...family,
    variants: family.variants.map(variant => ({
      ...variant,
      cssFamilyName: generateUniqueFamilyName(variant),
    })),
  }));
}
