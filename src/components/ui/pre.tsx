"use client";

import { ClassAttributes, HTMLAttributes } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { LucideClipboard } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Pre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement>) => {
  const { copy, showTooltip } = useCopyToClipboard();

  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps as unknown as {
    className: string;
    children: string;
  };
  const language = className?.replace("language-", "");

  return (
    <div className="text-sm relative">
      <SyntaxHighlighter language={language} style={oneLight}>
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <TooltipProvider>
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <Button
              className="absolute top-0 right-0"
              variant="ghost"
              size="icon"
              onClick={() => copy(code)}
            >
              <LucideClipboard />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Copied</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { Pre };
