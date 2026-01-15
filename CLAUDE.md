# Font Library - Project Guidelines

## Tech Stack
- **Framework**: Next.js 16 (static export)
- **Package Manager**: Bun (always use `bun` for dependencies)
- **UI Components**: Shadcn UI only
- **Styling**: Tailwind CSS
- **Notifications**: Sonner
- **Font Parsing**: fontkit

## Project Structure
```
├── app/                    # Next.js pages
├── components/
│   ├── fonts/             # Font-specific components
│   ├── layout/            # Layout components
│   ├── providers/         # React context providers
│   └── ui/                # Shadcn UI components
├── lib/
│   ├── constants.ts       # ALL project constants
│   ├── fonts/             # Font parsing & generation logic
│   └── utils.ts           # Utilities
├── public/
│   └── [font-family]/     # Font files (.ttf, .otf, .woff, .woff2)
└── scripts/
    └── generate-fonts.ts  # Build-time font processing
```

## Core Rules

### 1. Package Management
- Always use `bun` for JavaScript projects
- Never use npm or yarn

### 2. Constants
- ALL constants must be in `lib/constants.ts`
- No hardcoded values in components
- Examples: font sizes, durations, GitHub repo defaults, etc.

### 3. Generated Files
- `public/fonts-data.json` and `public/fonts.css` are auto-generated
- Never commit these files (they're in .gitignore)
- Generated during `bun run fonts:generate` (runs before build)

### 4. Environment Variables
Required for deployment:
- `NEXT_PUBLIC_GITHUB_REPOSITORY` - Format: "owner/repo"
- `NEXT_PUBLIC_GITHUB_BRANCH` - Default: "main"
- `BASE_PATH` - For subdirectory hosting (e.g., "/fonts")

### 5. Font CDN
- Use jsDelivr CDN for font delivery
- URL format: `https://cdn.jsdelivr.net/gh/{repo}@{branch}/public/{fontPath}`
- Always use `font-display: swap` in CSS

### 6. Components
- Only use Shadcn UI components
- No custom UI libraries
- Sonner for toast notifications
- Lucide React for icons

### 7. Responsive Design
- Mobile-first approach
- Use Tailwind breakpoints: sm, md, lg
- Icon-only buttons on mobile, text+icon on desktop

### 8. Git Commits
- Use Conventional Commits format
- Examples:
  - `feat: add GitHub repository link`
  - `fix: correct fonts.css loading with basePath`
  - `docs: update README with deployment steps`
  - `refactor: extract constants to constants.ts`

### 9. Legal & Licensing
- Legal disclaimer is MANDATORY for all font previews
- Fonts are for preview/educational purposes only
- Always respect font copyright holders
- Link to `/legal` page for full terms

### 10. Code Style
- No emojis unless explicitly requested
- TypeScript strict mode
- Use proper types (no `any` unless necessary)
- Clear, descriptive variable names

## Key Features

### Copy Functionality
Each font variant has 3 copy buttons:
1. **CSS @font-face** - Complete CSS code
2. **HTML <link>** - Preload link tag
3. **jsDelivr URL** - Direct CDN URL

### Font Preview
- Editable previews for each variant
- Font size slider (12-72px)
- Variant selector
- Custom preview text input

### Static Export
- Pre-rendered for GitHub Pages
- No server-side rendering
- All routes generated at build time

## Build & Deploy

### Local Development
```bash
bun install
bun run dev
```

### Production Build
```bash
bun run build        # Includes font generation
```

### Deployment
- Automatic via GitHub Actions on push to `main`
- Deploys to GitHub Pages
- Environment variables set automatically in workflow

## Important Notes

1. **basePath handling**: Always use `${basePath}/fonts.css` for stylesheet loading
2. **Font generation**: Runs automatically before build
3. **Environment defaults**: All env vars have fallback defaults in code
4. **Responsive buttons**: Hide text on mobile (`hidden sm:flex`)
5. **Toast duration**: Use `COPY_SUCCESS_TOAST_DURATION` constant
6. **Font families**: Add new fonts by creating folders in `public/`

## Adding New Fonts

1. Create folder in `public/[font-family-name]/`
2. Add font files (.ttf, .otf, .woff, .woff2)
3. Run `bun run fonts:generate`
4. Font appears automatically on homepage

## Common Tasks

### Add a new constant
Edit `lib/constants.ts` and import where needed

### Update UI component
Only use Shadcn components from `components/ui/`

### Modify copy buttons
Edit `components/fonts/variant-list.tsx` or `editable-preview.tsx`

### Change legal disclaimer
Edit `app/legal/page.tsx` and `components/layout/legal-notice.tsx`
