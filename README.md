# Font Library

A static font listing website built with Next.js, showcasing font families with interactive previews.

## Features

- 📚 Browse font families with pagination
- 🎨 Interactive font previews with editable text
- 🌓 Dark/light theme support
- 📱 Responsive design
- ⚡ Static site generation for GitHub Pages
- 🔤 Automatic font metadata extraction using fontkit
- ⚖️ Comprehensive legal disclaimer

## Getting Started

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adding Fonts

1. Create a directory in `public/` (e.g., `public/my-font/`)
2. Add font files (TTF, OTF, WOFF, WOFF2) to the directory
3. Run `bun run fonts:generate` to parse font metadata
4. Fonts will automatically appear in the library

## Building for Production

### Build at Root Path (/)

```bash
# Default - builds at root path
bun run build

# OR explicitly
bun run build:root
```

The site will be available at `https://yourdomain.com/`

### Build at Subdirectory (e.g., /fonts)

```bash
# Build for /fonts subdirectory
bun run build:fonts
```

The site will be available at `https://yourdomain.com/fonts/`

### Build at Custom Path

Set the `BASE_PATH` environment variable:

```bash
# Build for /f subdirectory
BASE_PATH=/f bun run build

# Build for /view subdirectory
BASE_PATH=/view bun run build

# OR use the custom script
BASE_PATH=/your-path bun run build:custom
```

### Using .env file

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Then set your desired base path:

```env
BASE_PATH=/fonts
```

Now `bun run build` will automatically use the base path from `.env`.

## Deployment

### GitHub Pages

1. Build with your desired base path:

```bash
# If your repo is at github.com/username/fonts
BASE_PATH=/fonts bun run build
```

2. Deploy the `out` directory to GitHub Pages

3. Your site will be at `https://username.github.io/fonts/`

### Other Platforms

For root deployment (Vercel, Netlify, etc.):

```bash
# Build at root
bun run build:root
```

Deploy the `out` directory.

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build with BASE_PATH from .env (or root if not set)
- `bun run build:root` - Build at root path (/)
- `bun run build:fonts` - Build at /fonts path
- `bun run build:custom` - Build with custom BASE_PATH from env
- `bun run fonts:generate` - Regenerate font metadata

## Project Structure

```
fonts/
├── app/                    # Next.js app directory
│   ├── [slug]/            # Dynamic font detail pages
│   ├── legal/             # Legal disclaimer page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── fonts/            # Font-specific components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   └── fonts/            # Font parsing & generation
├── scripts/              # Build scripts
│   └── generate-fonts.ts # Font metadata generator
├── public/               # Static files
│   ├── copernicus/      # Font files directory
│   ├── fonts.css        # Generated font CSS
│   └── fonts-data.json  # Generated font metadata
└── out/                  # Build output (static site)
```

## How It Works

1. **Font Parsing**: `fontkit` extracts metadata from font files
2. **Build Time**: Generates `fonts-data.json` and `fonts.css`
3. **Static Generation**: Creates static HTML pages
4. **Font Previews**: Each variant has editable preview text
5. **Deployment**: Serves as static site from `out/` directory

## Technologies

- **Next.js 16** - React framework with static export
- **shadcn/ui** - UI component library
- **Tailwind CSS 4** - Styling with OKLCH color space
- **fontkit** - Font metadata extraction
- **next-themes** - Dark/light theme support
- **Bun** - Package manager and runtime

## License

All fonts remain property of their respective copyright holders. See `/legal` page for full disclaimer.
