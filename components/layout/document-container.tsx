import Link from "next/link";

interface DocumentContainerProps {
  children: React.ReactNode;
}

export function DocumentContainer({ children }: DocumentContainerProps) {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 pt-[15vh] pb-[30vh] md:pt-[20vh] md:pb-[40vh] md:px-8">
        {children}
      </div>
      <footer className="pb-8 text-center text-sm">
        <div className="flex flex-col items-center gap-1">
          <p className="text-muted-foreground">
            Font Library © {currentYear}
          </p>
          <p className="text-xs text-muted-foreground">
            All fonts remain the property of their respective copyright holders.{" "}
            <Link href="/legal" className="hover:text-foreground transition-colors cursor-pointer">
              Legal Information
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
