"use client";

import { useState } from "react";
import { PreviewControls } from "@/components/fonts/preview-controls";
import { VariantList } from "@/components/fonts/variant-list";
import type { FontFamily } from "@/lib/fonts/types";

interface ClientPageProps {
  family: FontFamily;
}

export function ClientPage({ family }: ClientPageProps) {
  const [previewText, setPreviewText] = useState(family.previewText);
  const [fontSize, setFontSize] = useState(32);

  return (
    <>
      {/* Preview Controls */}
      <PreviewControls
        defaultText={family.previewText}
        onTextChange={setPreviewText}
        onSizeChange={setFontSize}
        defaultSize={32}
      />

      {/* Variants with Previews */}
      <VariantList
        variants={family.variants}
        familyId={family.id}
        defaultText={family.previewText}
        previewText={previewText}
        fontSize={fontSize}
      />

      {/* Legal Notice */}
      <div className="mt-12 p-4 border rounded-lg bg-muted/30">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold">Note:</span> This font is for preview purposes only.
          For commercial use, please obtain a proper license from the original foundry.
          All rights belong to the original copyright holders.
        </p>
      </div>
    </>
  );
}
