"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Code, FileCode, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import type { FontVariant } from "@/lib/fonts/types";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_GITHUB_REPOSITORY,
  DEFAULT_GITHUB_BRANCH,
  DEFAULT_FONT_SIZE,
  COPY_SUCCESS_TOAST_DURATION
} from "@/lib/constants";

interface VariantListProps {
  variants: FontVariant[];
  familyId: string;
  defaultText: string;
  previewText?: string;
  fontSize?: number;
}

export function VariantList({
  variants,
  defaultText,
  previewText,
  fontSize = DEFAULT_FONT_SIZE
}: VariantListProps) {
  const editableRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [copiedButton, setCopiedButton] = useState<string | null>(null);

  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || DEFAULT_GITHUB_REPOSITORY;
  const githubBranch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || DEFAULT_GITHUB_BRANCH;

  const getJsDelivrUrl = useCallback((filePath: string) => {
    const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    return `https://cdn.jsdelivr.net/gh/${githubRepo}@${githubBranch}/public/${cleanPath}`;
  }, [githubRepo, githubBranch]);

  const getCssImportCode = useCallback((variant: FontVariant) => {
    const url = getJsDelivrUrl(variant.filePath);
    const cssFamilyName = variant.cssFamilyName || DEFAULT_FONT_FAMILY;
    return `@font-face {
  font-family: '${cssFamilyName}';
  src: url('${url}') format('${variant.format === 'truetype' ? 'truetype' : variant.format}');
  font-weight: ${variant.weight};
  font-style: ${variant.style};
  font-display: swap;
}`;
  }, [getJsDelivrUrl]);

  const getHtmlLinkCode = useCallback((variant: FontVariant) => {
    const url = getJsDelivrUrl(variant.filePath);
    return `<link rel="preload" href="${url}" as="font" type="font/${variant.format}" crossorigin>`;
  }, [getJsDelivrUrl]);

  const getJsDelivrUrlOnly = useCallback((variant: FontVariant) => {
    return getJsDelivrUrl(variant.filePath);
  }, [getJsDelivrUrl]);

  const handleCopy = useCallback(async (code: string, type: string, variantIndex: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedButton(`${type}-${variantIndex}`);
      toast.success(`${type} copied to clipboard!`);
      setTimeout(() => setCopiedButton(null), COPY_SUCCESS_TOAST_DURATION);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  }, []);

  // Sort variants by weight (descending - heaviest first), then by style (normal before italic)
  const sortedVariants = useMemo(() => [...variants].sort((a, b) => {
    if (a.weight !== b.weight) {
      return b.weight - a.weight; // Reverse for descending (900 -> 100)
    }
    // Normal style comes before italic
    if (a.style === 'normal' && b.style !== 'normal') return -1;
    if (a.style !== 'normal' && b.style === 'normal') return 1;
    return 0;
  }), [variants]);

  // Set initial content only once
  useEffect(() => {
    sortedVariants.forEach((_, index) => {
      const element = editableRefs.current[index];
      if (element && !element.textContent) {
        element.textContent = defaultText;
      }
    });
  }, [sortedVariants, defaultText]);

  // Update all previews when previewText changes
  useEffect(() => {
    if (previewText !== undefined) {
      sortedVariants.forEach((_, index) => {
        const element = editableRefs.current[index];
        if (element) {
          element.textContent = previewText;
        }
      });
    }
  }, [previewText, sortedVariants]);

  return (
    <div className="space-y-4">
      {sortedVariants.map((variant, index) => {
        const cssFamilyName = variant.cssFamilyName || DEFAULT_FONT_FAMILY;
        const widthLabel = variant.width < 5 ? 'Condensed' : variant.width > 5 ? 'Expanded' : null;

        return (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            {/* Header with title and badges */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold mr-2">{variant.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {variant.weight}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {variant.style}
                </Badge>
                {widthLabel && (
                  <Badge variant="secondary" className="text-xs">
                    {widthLabel}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {variant.fileExtension.toUpperCase()}
                </Badge>
              </div>

              {/* Copy Buttons */}
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleCopy(getCssImportCode(variant), 'CSS @font-face', index)}
                      >
                        {copiedButton === `CSS @font-face-${index}` ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Code className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy @font-face CSS code</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleCopy(getHtmlLinkCode(variant), 'HTML <link>', index)}
                      >
                        {copiedButton === `HTML <link>-${index}` ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <FileCode className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy HTML &lt;link&gt; tag</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleCopy(getJsDelivrUrlOnly(variant), 'jsDelivr URL', index)}
                      >
                        {copiedButton === `jsDelivr URL-${index}` ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Link2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy jsDelivr CDN URL</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            {/* PostScript Name */}
            <div className="text-xs text-muted-foreground">
              <span className="font-mono">{variant.postscriptName}</span>
            </div>

            {/* Directly Editable Preview */}
            <div
              ref={(el) => { editableRefs.current[index] = el; }}
              className="p-4 border rounded bg-muted/20 min-h-[80px] cursor-text focus:outline-none focus:ring-2 focus:ring-ring wrap-break-word"
              contentEditable
              suppressContentEditableWarning
              style={{
                fontFamily: cssFamilyName,
                fontSize: `${fontSize}px`
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
