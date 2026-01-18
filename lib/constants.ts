/**
 * Application-wide constants
 */

// Font file extensions
export const FONT_EXTENSIONS = ['.ttf', '.otf', '.woff', '.woff2'] as const;

// Default preview text
export const DEFAULT_PANGRAM = "The quick brown fox jumps over the lazy dog";

// Lorem ipsum text for testing
export const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// GitHub CDN configuration
export const DEFAULT_GITHUB_REPOSITORY = 'viperadnan-git/fonts';
export const DEFAULT_GITHUB_BRANCH = 'main';

// File paths
export const FONTS_DATA_FILENAME = 'fonts-data.json';
export const FONTS_CSS_FILENAME = 'fonts.css';

// Default font fallback
export const DEFAULT_FONT_FAMILY = 'Copernicus';

// Font weights
export const DEFAULT_FONT_WEIGHT = 400;

// Font widths (1-9, where 5 is normal)
export const DEFAULT_FONT_WIDTH = 5;

// Font size limits
export const MIN_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 72;
export const DEFAULT_FONT_SIZE = 32;

// Preview control font sizes
export const PREVIEW_MAX_FONT_SIZE = 96;
export const PREVIEW_RESET_FONT_SIZE = DEFAULT_FONT_SIZE;
export const PREVIEW_LOREM_FONT_SIZE = 16;

// Toast/notification durations (milliseconds)
export const COPY_SUCCESS_TOAST_DURATION = 2000;

// Base path for deployment (e.g., "/fonts" for subdirectory hosting)
export const BASE_PATH = process.env.BASE_PATH || '';
