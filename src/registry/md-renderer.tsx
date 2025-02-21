"use client";

import React, {
  ClassAttributes,
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { cn } from "@/lib/utils";
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard";

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
  const [Complied, setCompiled] = useState<ReactNode | undefined>();

  useEffect(() => {
    compile(value, {
      format: "mdx",
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm],
    }).then((content) => {
      run(content, runtime).then((content) => {
        const { default: Content } = content;
        setCompiled(
          <Content
            components={{
              pre: Pre,
            }}
          ></Content>
        );
      });
    });
  }, [value]);

  return (
    <div className={cn("relative", className)} {...props}>
      {Complied}
    </div>
  );
};

export { MdRenderer };
