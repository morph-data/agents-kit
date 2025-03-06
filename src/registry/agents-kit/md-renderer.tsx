// agents-kit v0.0.1

"use client";

import React, { ClassAttributes, FC, HTMLAttributes } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { cn } from "@/lib/utils";
import { CopyToClipboard } from "./copy-to-clipboard";

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
} & HTMLAttributes<HTMLDivElement>;

const MdRenderer: FC<MdRendererProps> = ({
  value = "",
  className = "w-full max-w-ful",
  ...props
}) => {
  return (
    <div className={cn("relative", className)} {...props}>
      <Markdown remarkPlugins={[remarkGfm]} components={{ pre: Pre }}>
        {value}
      </Markdown>
    </div>
  );
};

export { MdRenderer };
