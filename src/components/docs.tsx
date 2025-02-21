import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

export const DocsLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-sm font-semibold text-orange-500 mb-4">{children}</div>
  );
};

export const DocsSteps: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      className="[&>div]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  );
};

export const DocsStep: FC<
  HTMLAttributes<HTMLDivElement> & { title: string }
> = (props) => {
  return (
    <div {...props}>
      <h3
        className={cn(
          "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
          props.className
        )}
      >
        {props.title}
      </h3>
      {props.children}
    </div>
  );
};
