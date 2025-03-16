"use client";

import { useEffect, useState } from "react";
import { Pre } from "@/components/ui/pre";
import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { registryItemSchema } from "@/lib/registry-item.zod";

type RegistrySourceProps = {
  basePath?: string;
  name: string;
};

const RegistrySource = ({ basePath = "/r", name }: RegistrySourceProps) => {
  const [sources, setSources] = useState<
    { source?: string; type?: string }[] | null
  >(null);
  useEffect(() => {
    const fetchSource = async () => {
      const response = await fetch(`${basePath}/${name}.json`);
      const source = await response.json();

      try {
        const parsedSource = registryItemSchema.parse(source);
        if (!parsedSource.files) {
          throw new Error("Component's JSON is not valid.");
        }

        setSources(
          parsedSource.files?.map((file) => ({
            source: file.content,
            type: file.path.split(".")[1],
          }))
        );
      } catch {
        setSources([
          { source: "Component's JSON is not valid.", type: "bash" },
        ]);
      }
    };
    fetchSource();
  }, [basePath, name]);
  return (
    <div>
      {sources?.map((source, index) => (
        <CodeBlockWrapper key={index}>
          <Pre>
            <code className={`language-${source.type}`}>{source.source}</code>
          </Pre>
        </CodeBlockWrapper>
      ))}
    </div>
  );
};

export { RegistrySource };
