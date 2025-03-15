// agents-kit v0.0.2

"use client";

import React, { ClassAttributes, FC, HTMLAttributes } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { cn } from "@/registry/agents-kit/lib/utils";
import { CopyToClipboard } from "@/registry/agents-kit/copy-to-clipboard";

import { Root, Element } from "hast";
import { Plugin } from "unified";

interface RehypeLoadingSpanOptions {
  isLoading?: boolean;
}

const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const rehypeLoadingSpan: Plugin<[RehypeLoadingSpanOptions?], Root> = (
  options = { isLoading: false }
) => {
  return (tree: Root) => {
    if (!options.isLoading) return;
    if (!tree.children || tree.children.length === 0) return;

    const spanNode: Element = {
      type: "element",
      tagName: "span",
      properties: {
        className: [
          "inline-block",
          "w-3",
          "h-3",
          "bg-primary",
          "rounded-full",
          "animate-bounce",
          "ml-1",
        ],
      },
      children: [],
    };

    const lastIndex = tree.children.length - 1;
    const lastNode = tree.children[lastIndex];

    if (lastNode.type === "element") {
      if (voidElements.has(lastNode.tagName)) {
        tree.children.push(spanNode);
      } else if (Array.isArray(lastNode.children)) {
        lastNode.children.push(spanNode);
      }
    } else {
      tree.children.push(spanNode);
    }
  };
};

const Pre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement>) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } =
    childProps as HTMLAttributes<HTMLElement>;
  const language = className?.replace("language-", "");

  return (
    <div className="text-sm relative">
      <SyntaxHighlighter language={language} style={oneLight}>
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <div className="absolute top-0 right-0 p-1">
        <CopyToClipboard value={String(code)} variant={"ghost"} />
      </div>
    </div>
  );
};

type MdRendererProps = {
  value?: string;
  isLoading?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const MdRenderer: FC<MdRendererProps> = ({
  value = "",
  className = "w-full max-w-ful",
  isLoading = false,
  ...props
}) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeLoadingSpan, { isLoading }]]}
        components={{ pre: Pre }}
      >
        {value}
      </Markdown>
    </div>
  );
};

export { MdRenderer };
