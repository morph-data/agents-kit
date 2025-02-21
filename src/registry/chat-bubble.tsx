import React, { FC, HTMLAttributes, PropsWithChildren } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chatBubbleVariatnts = cva("p-4", {
  variants: {
    variant: {
      bubble: "max-w-[75%] w-fit bg-muted rounded-lg",
      ghost: "border-none",
      supplementary:
        "text-muted-foreground text-sm py-2 border-l-4 border-border",
    },
  },
  defaultVariants: {
    variant: "bubble",
  },
});

type ChatBubbleProps = {} & VariantProps<typeof chatBubbleVariatnts> &
  HTMLAttributes<HTMLDivElement>;

const ChatBubble: FC<PropsWithChildren<ChatBubbleProps>> = ({
  variant,
  className,
  ...props
}) => {
  return (
    <div>
      <div className={cn(chatBubbleVariatnts({ variant }), className)}>
        {props.children}
      </div>
    </div>
  );
};

export { ChatBubble };
