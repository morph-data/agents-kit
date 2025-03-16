import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

const Steps: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      className="steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  );
};

const Step: FC<HTMLAttributes<HTMLDivElement> & { title: string }> = (
  props
) => {
  return (
    <div {...props} className="step">
      <div
        className={cn(
          "font-heading mt-8 scroll-m-20 font-xl font-semibold tracking-tight",
          props.className
        )}
      >
        {props.title}
      </div>
      {props.children}
    </div>
  );
};

export { Steps, Step };
