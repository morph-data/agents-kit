"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

// https://github.com/shadcn-ui/ui/blob/main/apps/www/components/docs-nav.tsx

export const DocsSidebar = () => {
  return (
    <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
      <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
        {/* <DocsNav config={docsConfig} /> */}
        <div className="flex flex-col gap-6">
          <DocsSidebarGroup>
            <DocsSidebarGroupHeading>Getting Started</DocsSidebarGroupHeading>
            <DocsSidebarItem href="/docs/getting-started/installation">
              Installation
            </DocsSidebarItem>
          </DocsSidebarGroup>
          <DocsSidebarGroup>
            <DocsSidebarGroupHeading>Componennts</DocsSidebarGroupHeading>
            <DocsSidebarItem href="/docs/components/autosize-textarea">
              Autosize Textarea
            </DocsSidebarItem>
            <DocsSidebarItem href="/docs/components/chat-actions">
              Chat Actions
            </DocsSidebarItem>
            <DocsSidebarItem href="/docs/components/chat-bubble">
              Chat Bubble
            </DocsSidebarItem>
            <DocsSidebarItem href="/docs/components/copy-to-clipboard">
              Copy to Clipboard
            </DocsSidebarItem>
            <DocsSidebarItem href="/docs/components/md-renderer">
              Markdown Renderer
            </DocsSidebarItem>
            <DocsSidebarItem href="/docs/components/message-area">
              Message Area
            </DocsSidebarItem>
          </DocsSidebarGroup>
          <DocsSidebarGroup>
            <DocsSidebarGroupHeading>Blocks</DocsSidebarGroupHeading>
            <DocsSidebarItem href="/docs/blocks/chat-form">
              Chat Form
            </DocsSidebarItem>
            <DocsSidebarItem href="/docs/blocks/chat-messages">
              Chat Messages
            </DocsSidebarItem>
          </DocsSidebarGroup>
          <DocsSidebarGroup>
            <DocsSidebarGroupHeading>Example App</DocsSidebarGroupHeading>
            <DocsSidebarItem href="/docs/example/nextjs">
              Next.js + Vercel AI SDK
            </DocsSidebarItem>
          </DocsSidebarGroup>
        </div>
      </div>
    </aside>
  );
};

const DocsSidebarGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const DocsSidebarGroupHeading: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h4 className="rounded-md px-2 py-1 text-sm font-semibold">{children}</h4>
  );
};

const DocsSidebarItem: FC<
  PropsWithChildren<{ href: string; label?: string; external?: boolean }>
> = ({ children, href, external, label }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "group text-sm flex h-8 w-full items-center rounded-lg px-2 font-normal text-foreground underline-offset-2 hover:bg-accent hover:text-accent-foreground",
        pathname === href && "bg-accent font-medium text-accent-foreground"
      )}
      target={external ? "_blank" : ""}
      rel={external ? "noreferrer" : ""}
    >
      {children}
      {label && (
        <span className="ml-2 rounded-md bg-orange-400 px-1.5 py-0.5 text-xs leading-none text-[#fff] no-underline group-hover:no-underline">
          {label}
        </span>
      )}
    </Link>
  );
};
