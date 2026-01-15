import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DocumentContainer } from "@/components/layout/document-container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Font Library - Typography Collection",
  description: "Browse and preview a curated collection of beautiful typefaces. View font families, variants, and test them with custom text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/fonts.css" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <ThemeToggle />
          <DocumentContainer>
            {children}
          </DocumentContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
