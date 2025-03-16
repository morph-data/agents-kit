"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Step, Steps } from "@/components/ui/steps";
import { RegistrySource } from "@/components/registry-source";
import { Pre } from "@/components/ui/pre";
import {
  RegistryItem,
  registryItemSchema,
} from "@/lib/registry-item.zod";

type RegistrySourceProps = {
  homepage?: string;
  basePath?: string;
  name: string;
};

const RegistryInstallation = ({
  homepage,
  basePath = "/r",
  name,
}: RegistrySourceProps) => {
  const [json, setJson] = useState<RegistryItem | null>(null);

  useEffect(() => {
    const fetchSource = async () => {
      const response = await fetch(`${basePath}/${name}.json`);
      const source = await response.json();

      try {
        const parsedSource = registryItemSchema.parse(source);
        setJson(parsedSource);
      } catch {
        throw new Error("Component's JSON is not valid.");
      }
    };
    fetchSource();
  }, [basePath, name]);

  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList>
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent value="cli">
        <Pre>
          <code className="language-bash">
            {`npx shadcn@latest add ${homepage}${basePath}/${name}.json`}
          </code>
        </Pre>
      </TabsContent>
      <TabsContent value="manual">
        <Steps>
          {[
            ...(json?.dependencies || []),
            ...(json?.devDependencies || []),
            ...(json?.registryDependencies || []),
          ].length > 0 && (
            <Step title="Install dependencies">
              {json?.dependencies && json.dependencies.length > 0 && (
                <Pre>
                  <code className="language-bash">
                    {`npm install ${json.dependencies.join(" ")}`}
                  </code>
                </Pre>
              )}
              {json?.devDependencies && json.devDependencies.length > 0 && (
                <Pre>
                  <code className="language-bash">
                    {`npm install ${json.devDependencies.join(" ")}`}
                  </code>
                </Pre>
              )}
              {json?.registryDependencies &&
                json.registryDependencies.length > 0 && (
                  <Pre>
                    <code className="language-bash">
                      {`npx shadcn@latest add ${json.registryDependencies.join(
                        " "
                      )}`}
                    </code>
                  </Pre>
                )}
            </Step>
          )}
          <Step title="Add component">
            Copy and paste the code into your project’s component directory. The
            recommended file name is `components/{name}.tsx`.
            <RegistrySource name={name} />
          </Step>
        </Steps>
      </TabsContent>
    </Tabs>
  );
};

export { RegistryInstallation };
