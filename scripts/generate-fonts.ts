#!/usr/bin/env bun
import fs from 'fs';
import path from 'path';
import { scanFontDirectories } from '../lib/fonts/parser';
import { generateFontsCSS, enrichVariantsWithCSSFamily } from '../lib/fonts/generator';
import type { FontsData } from '../lib/fonts/types';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const FONTS_DATA_PATH = path.join(PUBLIC_DIR, 'fonts-data.json');
const FONTS_CSS_PATH = path.join(PUBLIC_DIR, 'fonts.css');

async function main() {
  console.log('🔍 Scanning for font directories...');
  console.log(`📁 Public directory: ${PUBLIC_DIR}`);

  // Scan all directories in public folder
  const families = scanFontDirectories(PUBLIC_DIR);

  if (families.length === 0) {
    console.error('❌ No font families found!');
    process.exit(1);
  }

  console.log(`✅ Found ${families.length} font families`);

  // Count total font files
  const totalFonts = families.reduce((sum, family) => sum + family.variants.length, 0);
  console.log(`📝 Total font files: ${totalFonts}`);

  // List found families
  families.forEach(family => {
    console.log(`   - ${family.displayName} (${family.variants.length} variants)`);
  });

  // Enrich variants with CSS family names
  const enrichedFamilies = enrichVariantsWithCSSFamily(families);

  // Generate fonts data JSON
  const fontsData: FontsData = {
    families: enrichedFamilies,
    totalFonts,
    totalFamilies: families.length,
    lastUpdated: new Date().toISOString(),
  };

  // Write fonts-data.json
  console.log('\n📄 Generating fonts-data.json...');
  fs.writeFileSync(FONTS_DATA_PATH, JSON.stringify(fontsData, null, 2), 'utf-8');
  console.log(`✅ Written to: ${FONTS_DATA_PATH}`);

  // Generate fonts.css
  console.log('\n🎨 Generating fonts.css...');
  const fontsCSS = generateFontsCSS(enrichedFamilies);
  fs.writeFileSync(FONTS_CSS_PATH, fontsCSS, 'utf-8');
  console.log(`✅ Written to: ${FONTS_CSS_PATH}`);

  console.log('\n✨ Font generation complete!');
}

main().catch(error => {
  console.error('❌ Font generation failed:', error);
  process.exit(1);
});
