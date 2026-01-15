import * as fontkit from 'fontkit';
import fs from 'fs';
import path from 'path';
import type { FontVariant, FontFamily } from './types';
import {
  FONT_EXTENSIONS,
  DEFAULT_PANGRAM,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_WIDTH
} from '@/lib/constants';

// Extended type for fontkit.Font with additional properties
interface FontWithMetadata {
  familyName?: string;
  fullName?: string;
  postscriptName?: string;
  italicAngle?: number;
  'OS/2'?: {
    usWeightClass?: number;
    usWidthClass?: number;
  };
}

/**
 * Parse a single font file and extract metadata using fontkit
 */
export function parseFontFile(filePath: string, dirName: string): FontVariant | null {
  try {
    const fontData = fontkit.openSync(filePath);
    const fileName = path.basename(filePath);
    const fileExtension = path.extname(filePath).slice(1);

    // Handle FontCollection vs Font
    const fontBase = 'fonts' in fontData ? fontData.fonts[0] : fontData;
    const font = fontBase as unknown as FontWithMetadata;

    // Extract metadata from font tables
    const familyName = font.familyName || 'Unknown';
    const fullName = font.fullName || fileName;
    const postscriptName = font.postscriptName || fileName.replace(/\.\w+$/, '');

    // Get weight from OS/2 table (100-900)
    const weight = font['OS/2']?.usWeightClass || DEFAULT_FONT_WEIGHT;

    // Get width from OS/2 table (1-9, 5=normal)
    const width = font['OS/2']?.usWidthClass || DEFAULT_FONT_WIDTH;

    // Determine style from italic angle
    const style: 'normal' | 'italic' | 'oblique' =
      font.italicAngle !== 0 ? 'italic' : 'normal';

    // Determine format from extension
    let format: 'truetype' | 'opentype' | 'woff' | 'woff2';
    switch (fileExtension.toLowerCase()) {
      case 'ttf':
        format = 'truetype';
        break;
      case 'otf':
        format = 'opentype';
        break;
      case 'woff':
        format = 'woff';
        break;
      case 'woff2':
        format = 'woff2';
        break;
      default:
        format = 'truetype';
    }

    // Extract variant name from full name (more reliable than subfamily)
    const variantName = extractVariantName(fullName, familyName);

    return {
      name: variantName,
      familyName,
      fullName,
      postscriptName,
      fileName,
      filePath: `/${dirName}/${fileName}`,
      weight,
      width,
      style,
      format,
      fileExtension,
    };
  } catch (error) {
    console.error(`Error parsing font file ${filePath}:`, error);
    return null;
  }
}

/**
 * Extract variant name from full name by removing family name
 */
function extractVariantName(fullName: string, familyName: string): string {
  // Clean up the names first
  let cleanFullName = fullName;
  let cleanFamilyName = familyName;

  // Remove "Trial" and version numbers from both
  cleanFullName = cleanFullName.replace(/\s*Trial\s*/gi, ' ').trim();
  cleanFamilyName = cleanFamilyName.replace(/\s*Trial\s*/gi, ' ').trim();

  // Extract the base family name (before the variant)
  // Common patterns: "FontFamily Heavy", "FontFamily Bold Italic", etc.
  const weightPatterns = /(Thin|Hairline|Extra ?Light|Ultra ?Light|Light|Book|Regular|Normal|Medium|Semi ?bold|Demi ?bold|Bold|Extra ?bold|Ultra ?bold|Black|Heavy|Ultra)/i;
  const baseFamily = cleanFamilyName.replace(weightPatterns, '').trim();

  // Extract variant by removing base family
  let variant = cleanFullName.replace(baseFamily, '').trim();

  // Clean up the variant name
  variant = variant.replace(/^[-_\s]+/, '');
  variant = variant.replace(/\s*Beta\s*\d+/gi, '').trim();
  variant = variant.replace(/\s*\d+\s*/g, '').trim();

  // Normalize common weight names
  variant = variant.replace(/Extra ?bold/i, 'Extrabold');
  variant = variant.replace(/Semi ?bold/i, 'Semibold');

  // If empty, default to "Regular"
  return variant || 'Regular';
}

/**
 * Select the main variant from a list of variants
 * Heuristics: Prefer Regular/Book (400 weight, normal style)
 */
export function selectMainVariant(variants: FontVariant[]): FontVariant {
  if (variants.length === 0) {
    throw new Error('No variants to select from');
  }

  // Sort by weight (ascending), then style (normal before italic)
  const sorted = [...variants].sort((a, b) => {
    if (a.weight !== b.weight) {
      return a.weight - b.weight;
    }
    if (a.style === 'normal' && b.style !== 'normal') return -1;
    if (a.style !== 'normal' && b.style === 'normal') return 1;
    return 0;
  });

  // Prefer weight 400, normal style
  const regular = sorted.find(v => v.weight === 400 && v.style === 'normal');
  if (regular) return regular;

  // Fallback to weight 500, normal style
  const medium = sorted.find(v => v.weight === 500 && v.style === 'normal');
  if (medium) return medium;

  // Fallback to first in sorted list (lightest weight, normal style preferred)
  return sorted[0];
}

/**
 * Extract the base font family name by removing weight/style/trial keywords
 * This is a root fix that handles all future font naming variations
 */
function extractBaseFamilyName(familyNames: string[]): string {
  if (familyNames.length === 0) return 'Unknown';

  // Keywords to remove (weights, styles, and other descriptors)
  const KEYWORDS_TO_REMOVE = [
    // Trial/Beta versions
    /\s*Trial\s*/gi,
    /\s*Beta\s*\d*/gi,
    /\s*Test\s*/gi,
    /\s*Demo\s*/gi,

    // Weights
    /\s*Thin\s*/gi,
    /\s*Hairline\s*/gi,
    /\s*Ultra\s*Light\s*/gi,
    /\s*Extra\s*Light\s*/gi,
    /\s*Light\s*/gi,
    /\s*Book\s*/gi,
    /\s*Regular\s*/gi,
    /\s*Normal\s*/gi,
    /\s*Roman\s*/gi,
    /\s*Medium\s*/gi,
    /\s*Semi\s*bold\s*/gi,
    /\s*Demi\s*bold\s*/gi,
    /\s*Bold\s*/gi,
    /\s*Extra\s*bold\s*/gi,
    /\s*Ultra\s*bold\s*/gi,
    /\s*Black\s*/gi,
    /\s*Heavy\s*/gi,
    /\s*Ultra\s*/gi,
    /\s*Fat\s*/gi,

    // Styles
    /\s*Italic\s*/gi,
    /\s*Oblique\s*/gi,
    /\s*Slanted\s*/gi,

    // Widths
    /\s*Condensed\s*/gi,
    /\s*Cond\s*/gi,
    /\s*Compressed\s*/gi,
    /\s*Narrow\s*/gi,
    /\s*Extended\s*/gi,
    /\s*Expanded\s*/gi,
    /\s*Wide\s*/gi,

    // Numbers (often used for weights like "170", "070")
    /\s*\d+\s*/g,
  ];

  // Clean all family names
  const cleanedNames = familyNames.map(name => {
    let cleaned = name;
    KEYWORDS_TO_REMOVE.forEach(pattern => {
      cleaned = cleaned.replace(pattern, ' ');
    });
    return cleaned.trim().replace(/\s+/g, ' '); // Normalize whitespace
  });

  // Find the common base name (longest common prefix approach)
  // Group by cleaned name and pick the most common one
  const nameCounts = new Map<string, number>();
  cleanedNames.forEach(name => {
    const count = nameCounts.get(name) || 0;
    nameCounts.set(name, count + 1);
  });

  // Get the most common base name
  let baseName = '';
  let maxCount = 0;
  nameCounts.forEach((count, name) => {
    if (count > maxCount && name.length > 0) {
      maxCount = count;
      baseName = name;
    }
  });

  // If we found a base name, use it; otherwise use the first cleaned name
  return baseName || cleanedNames[0] || familyNames[0];
}

/**
 * Determine font category from family name or variants
 */
function determineFontCategory(familyName: string): string {
  const lowerName = familyName.toLowerCase();

  if (lowerName.includes('mono') || lowerName.includes('code') || lowerName.includes('courier')) {
    return 'monospace';
  }

  if (lowerName.includes('sans')) {
    return 'sans-serif';
  }

  if (lowerName.includes('display') || lowerName.includes('decorative')) {
    return 'display';
  }

  // Default to serif
  return 'serif';
}

/**
 * Parse all fonts in a directory and create a FontFamily
 */
export function parseFontDirectory(dirPath: string, dirName: string): FontFamily | null {
  try {
    const files = fs.readdirSync(dirPath);
    const fontFiles = files.filter(file =>
      FONT_EXTENSIONS.includes(path.extname(file).toLowerCase() as typeof FONT_EXTENSIONS[number])
    );

    if (fontFiles.length === 0) {
      console.warn(`No font files found in directory: ${dirPath}`);
      return null;
    }

    // Parse all font files
    const variants: FontVariant[] = [];
    for (const file of fontFiles) {
      const filePath = path.join(dirPath, file);
      const variant = parseFontFile(filePath, dirName);
      if (variant) {
        variants.push(variant);
      }
    }

    if (variants.length === 0) {
      console.warn(`No valid font variants found in directory: ${dirPath}`);
      return null;
    }

    // Select main variant
    const mainVariant = selectMainVariant(variants);

    // Extract the base family name from all variants (root fix for consistent naming)
    const allFamilyNames = variants.map(v => v.familyName);
    const baseFamilyName = extractBaseFamilyName(allFamilyNames);

    // Determine category
    const category = determineFontCategory(baseFamilyName);

    return {
      id: dirName,
      slug: dirName,
      name: baseFamilyName,
      displayName: baseFamilyName,
      category,
      variants,
      mainVariant,
      previewText: DEFAULT_PANGRAM,
    };
  } catch (error) {
    console.error(`Error parsing font directory ${dirPath}:`, error);
    return null;
  }
}

/**
 * Scan the public directory for font directories and parse all fonts
 */
export function scanFontDirectories(publicPath: string): FontFamily[] {
  const families: FontFamily[] = [];

  try {
    const entries = fs.readdirSync(publicPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(publicPath, entry.name);
        const family = parseFontDirectory(dirPath, entry.name);
        if (family) {
          families.push(family);
        }
      }
    }

    // Sort families alphabetically by name
    families.sort((a, b) => a.name.localeCompare(b.name));

    return families;
  } catch (error) {
    console.error(`Error scanning font directories in ${publicPath}:`, error);
    return [];
  }
}
