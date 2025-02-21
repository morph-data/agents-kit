import { Icon, LucideArrowRight } from "lucide-react";
import { tieBow } from "@lucide/lab";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] w-full">
      <main className="flex flex-col gap-4 row-start-2 items-center w-full max-w-[1440px]">
        <div className="flex gap-2 items-center">
          <Icon iconNode={tieBow} size={72} />
          <h1 className="font-bold text-5xl">Agents Kit</h1>
        </div>
        <p>Copy-and-paste React components for LLM Apps</p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/docs/getting-started/installation"
            rel="noopener noreferrer"
          >
            Start building <LucideArrowRight />
          </a>
        </div>

        <Card
          className="relative w-full hidden md:block p-1"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            src="https://stackblitz.com/edit/stackblitz-starters-qjm3f3ed?embed=1&file=app%2Fpage.tsx&hideExplorer=1&hideNavigation=1"
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
          ></iframe>
        </Card>

        <Card className="aspect-[2/3] md:hidden w-full p-1">
          <iframe
            src="https://stackblitz.com/edit/stackblitz-starters-qjm3f3ed?embed=1&file=app%2Fpage.tsx&hideExplorer=1&hideNavigation=1&view=preview"
            className="w-full h-full"
          ></iframe>
        </Card>
      </main>
    </div>
  );
}
