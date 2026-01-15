"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Code, FileCode, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import type { FontFamily } from "@/lib/fonts/types";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_GITHUB_REPOSITORY,
  DEFAULT_GITHUB_BRANCH,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
  DEFAULT_FONT_SIZE,
  COPY_SUCCESS_TOAST_DURATION
} from "@/lib/constants";

interface EditablePreviewProps {
  family: FontFamily;
}

export function EditablePreview({ family }: EditablePreviewProps) {
  const [text, setText] = useState(family.previewText);
  const [fontSize, setFontSize] = useState([DEFAULT_FONT_SIZE]);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [copiedButton, setCopiedButton] = useState<string | null>(null);

  const variant = family.variants[selectedVariant];
  const cssFamilyName = variant.cssFamilyName || DEFAULT_FONT_FAMILY;

  const githubRepo = process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || DEFAULT_GITHUB_REPOSITORY;
  const githubBranch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || DEFAULT_GITHUB_BRANCH;

  const getJsDelivrUrl = (filePath: string) => {
    const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    return `https://cdn.jsdelivr.net/gh/${githubRepo}@${githubBranch}/public/${cleanPath}`;
  };

  const getCssImportCode = () => {
    const url = getJsDelivrUrl(variant.filePath);
    return `@font-face {
  font-family: '${cssFamilyName}';
  src: url('${url}') format('${variant.format === 'truetype' ? 'truetype' : variant.format}');
  font-weight: ${variant.weight};
  font-style: ${variant.style};
  font-display: swap;
}`;
  };

  const getHtmlLinkCode = () => {
    const url = getJsDelivrUrl(variant.filePath);
    return `<link rel="preload" href="${url}" as="font" type="font/${variant.format}" crossorigin>`;
  };

  const getJsDelivrUrlOnly = () => {
    return getJsDelivrUrl(variant.filePath);
  };

  const handleCopy = async (code: string, type: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedButton(type);
      toast.success(`${type} copied to clipboard!`);
      setTimeout(() => setCopiedButton(null), COPY_SUCCESS_TOAST_DURATION);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls and Copy Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        {/* Controls */}
        <div className="grid gap-4 md:grid-cols-2 flex-1">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Font Size: {fontSize[0]}px
            </label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={MIN_FONT_SIZE}
              max={MAX_FONT_SIZE}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Variant
            </label>
            <Select
              value={selectedVariant.toString()}
              onValueChange={(value) => setSelectedVariant(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {family.variants.map((v, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {v.fullName} ({v.weight})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Copy Buttons */}
        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => handleCopy(getCssImportCode(), 'CSS @font-face')}
                >
                  {copiedButton === 'CSS @font-face' ? (
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
                  onClick={() => handleCopy(getHtmlLinkCode(), 'HTML <link>')}
                >
                  {copiedButton === 'HTML <link>' ? (
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
                  onClick={() => handleCopy(getJsDelivrUrlOnly(), 'jsDelivr URL')}
                >
                  {copiedButton === 'jsDelivr URL' ? (
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

      {/* Text Input */}
      <div>
        <label className="text-sm font-medium mb-2 block">
          Preview Text ({text.length} characters)
        </label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your custom text here..."
          className="min-h-[100px] resize-y"
        />
      </div>

      {/* Preview Display */}
      <Card>
        <CardContent className="p-8">
          <p
            className="leading-relaxed wrap-break-word"
            style={{
              fontFamily: cssFamilyName,
              fontSize: `${fontSize[0]}px`,
            }}
          >
            {text}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
