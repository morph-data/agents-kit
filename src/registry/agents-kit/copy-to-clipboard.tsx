"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideClipboard } from "lucide-react";

export interface CopyToClipboardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  value: string;
}

function useCopyToClipboard() {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const openTooltip = React.useCallback(() => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  }, []);

  const copy = React.useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported");
        return false;
      }

      // Try to save to clipboard then save it in the state if worked
      try {
        await navigator.clipboard.writeText(text);
        openTooltip();
        return true;
      } catch (error) {
        console.warn("Copy failed", error);
        return false;
      }
    },
    [openTooltip]
  );

  return {
    copy,
    showTooltip,
  };
}

const CopyToClipboard = React.forwardRef<
  HTMLButtonElement,
  CopyToClipboardProps
>(
  (
    {
      className,
      variant,
      size = "icon",
      asChild = false,
      value,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const { copy, showTooltip } = useCopyToClipboard();

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        copy(value);
        if (onClick) {
          onClick(e);
        }
      },
      [copy, value, onClick]
    );

    return (
      <TooltipProvider>
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              onClick={handleClick}
              {...props}
            >
              <LucideClipboard />
              {props.children}
            </Comp>
          </TooltipTrigger>
          <TooltipContent>
            <span>Copied</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
CopyToClipboard.displayName = "CopyToClipboard";

export { CopyToClipboard, useCopyToClipboard };
