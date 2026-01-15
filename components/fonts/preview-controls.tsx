"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RotateCcw, FileText } from "lucide-react";
import {
  LOREM_IPSUM,
  MIN_FONT_SIZE,
  PREVIEW_MAX_FONT_SIZE,
  DEFAULT_FONT_SIZE,
  PREVIEW_RESET_FONT_SIZE,
  PREVIEW_LOREM_FONT_SIZE
} from "@/lib/constants";

interface PreviewControlsProps {
  defaultText: string;
  onTextChange: (text: string) => void;
  onSizeChange: (size: number) => void;
  defaultSize?: number;
}

export function PreviewControls({
  defaultText,
  onTextChange,
  onSizeChange,
  defaultSize = DEFAULT_FONT_SIZE
}: PreviewControlsProps) {
  const [text, setText] = useState(defaultText);
  const [size, setSize] = useState(defaultSize);

  const handleTextChange = (newText: string) => {
    setText(newText);
    onTextChange(newText);
  };

  const handleSizeChange = (values: number[]) => {
    const newSize = values[0];
    setSize(newSize);
    onSizeChange(newSize);
  };

  const handleReset = () => {
    setText(defaultText);
    onTextChange(defaultText);
    setSize(PREVIEW_RESET_FONT_SIZE);
    onSizeChange(PREVIEW_RESET_FONT_SIZE);
  };

  const handleLorem = () => {
    setText(LOREM_IPSUM);
    onTextChange(LOREM_IPSUM);
    setSize(PREVIEW_LOREM_FONT_SIZE);
    onSizeChange(PREVIEW_LOREM_FONT_SIZE);
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-muted/30 space-y-4">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Preview Text
          </label>
          <Textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="min-h-[60px] resize-y text-sm"
            placeholder="Type your preview text..."
          />
        </div>
        <div className="flex gap-2 pt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            title="Reset to default text"
            className="cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleLorem}
            title="Load Lorem Ipsum"
            className="cursor-pointer"
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-muted-foreground">
            Font Size
          </label>
          <span className="text-xs text-muted-foreground font-mono">
            {size}px
          </span>
        </div>
        <Slider
          value={[size]}
          onValueChange={handleSizeChange}
          min={MIN_FONT_SIZE}
          max={PREVIEW_MAX_FONT_SIZE}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}
