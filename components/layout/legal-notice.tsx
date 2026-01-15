"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Link from "next/link";

export function LegalNotice() {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = "All fonts displayed on this website are provided for educational and preview purposes only. These fonts are trial versions, free fonts under open licenses, or sourced from public archives and GitHub repositories. All fonts remain the property of their respective copyright holders and foundries. This website is not affiliated with font creators. Commercial use requires purchasing proper licenses from the original foundries. We respect intellectual property rights and will promptly remove any content upon request. For licensing inquiries, please contact the original font foundries directly.";

  const shortText = "All fonts displayed on this website are provided for educational and preview purposes only. These fonts are trial versions, free fonts under open licenses, or sourced from public archives and GitHub repositories. All fonts remain the property of their respective copyright holders...";

  return (
    <div className="mb-8 p-3 sm:p-4 border rounded-lg bg-muted/30">
      <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <p>
          <span className="font-semibold">Legal Notice:</span> {isExpanded ? fullText : shortText}{" "}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="inline text-primary hover:underline whitespace-nowrap font-normal cursor-pointer"
            >
              Learn more <ChevronDown className="inline h-3 w-3 ml-0.5" />
            </button>
          )}
        </p>
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="inline-block mt-2 text-xs sm:text-sm text-primary hover:underline whitespace-nowrap cursor-pointer"
          >
            Show less <ChevronUp className="inline h-3 w-3 ml-0.5" />
          </button>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <Link href="/legal">
          <Button variant="link" className="h-auto p-0 text-xs sm:text-sm gap-1 cursor-pointer">
            Full legal information <ExternalLink className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
