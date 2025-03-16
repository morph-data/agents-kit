import type { MDXComponents } from "mdx/types";
import { DocsPre } from "./components/docs-pre";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { DocsLabel, DocsStep, DocsSteps } from "@/components/docs";
import { CodeBlockWrapper } from "./components/code-block-wrapper";
import { PreviewAndCode } from "./components/preview-and-code";
import { RegistryInstallation } from "./components/registry-installation";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: DocsPre,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Card,
    Label: DocsLabel,
    Steps: DocsSteps,
    Step: DocsStep,
    CodeBlockWrapper: CodeBlockWrapper,
    PreviewAndCode: PreviewAndCode,
    RegistryInstallation,
  };
}
