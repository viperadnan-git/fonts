import type { FontsData } from './types';

/**
 * Load fonts data from generated JSON file
 * This runs at build time for static generation
 */
export async function getFontsData(): Promise<FontsData> {
  try {
    // In development, read from file system
    if (process.env.NODE_ENV === 'development') {
      const fs = await import('fs/promises');
      const path = await import('path');
      const filePath = path.join(process.cwd(), 'public', 'fonts-data.json');
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as FontsData;
    }

    // In production build, import the JSON file
    const data = await import('@/public/fonts-data.json');
    return (data.default || data) as FontsData;
  } catch (error) {
    console.error('Error loading fonts data:', error);
    return {
      families: [],
      totalFonts: 0,
      totalFamilies: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Get a single font family by slug
 */
export async function getFontFamily(slug: string) {
  const data = await getFontsData();
  return data.families.find(family => family.slug === slug);
}

/**
 * Get all font family slugs for static generation
 */
export async function getAllFontSlugs() {
  const data = await getFontsData();
  return data.families.map(family => family.slug);
}
