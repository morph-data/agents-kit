import { Icon, LucideArrowRight } from "lucide-react";
import { tieBow } from "@lucide/lab";
import { ChatDemo } from "@/components/chat-demo";
import ChatDemoCode from "@/components/chat-demo-code.mdx";
import ShadcnInstall from "@/components/shadcn-install.mdx";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-8 pb-20 gap-8 sm:px-20 font-[family-name:var(--font-geist-sans)] w-full container-wrapper">
      <main className="flex flex-col gap-4 row-start-2 items-center w-full max-w-[1440px] container">
        <div className="flex gap-1 items-center">
          <Icon iconNode={tieBow} size={40} />
          <h1 className="font-bold text-2xl">Agents Kit</h1>
        </div>
        <p className="text-4xl font-bold text-center">
          Copy-and-paste React components for LLM Apps
        </p>
        <p className="text-lg">
          Works perfectly with{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            shadcn/ui
          </a>{" "}
          and{" "}
          <a
            href="https://sdk.vercel.ai/docs/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vercel AI SDK
          </a>
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row my-4">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/docs/getting-started/installation"
            rel="noopener noreferrer"
          >
            Start building <LucideArrowRight />
          </a>
        </div>

        <div className="w-full xl:w-[80%] mx-auto px-4">
          <ShadcnInstall />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ChatDemo />
          </div>
          <div>
            <ChatDemoCode />
          </div>
        </div>

        {/* <Card className="aspect-[2/3] md:hidden w-full p-1">
          <iframe
            src="https://stackblitz.com/edit/stackblitz-starters-qjm3f3ed?embed=1&file=app%2Fpage.tsx&hideExplorer=1&hideNavigation=1&view=preview"
            className="w-full h-full"
          ></iframe>
        </Card> */}
      </main>
    </div>
  );
}
