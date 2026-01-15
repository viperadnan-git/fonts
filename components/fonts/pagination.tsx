import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between mt-8">
      <div className="flex-1">
        {hasPrev && (
          <Link href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}>
            <Button variant="outline" className="gap-2 cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
          </Link>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex-1 flex justify-end">
        {hasNext && (
          <Link href={`/?page=${currentPage + 1}`}>
            <Button variant="outline" className="gap-2 cursor-pointer">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
