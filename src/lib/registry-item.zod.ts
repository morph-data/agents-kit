import { z } from "zod";

// Enum definition for the "type" field.
const registryTypeEnum = z.enum([
  "registry:lib",
  "registry:block",
  "registry:component",
  "registry:ui",
  "registry:hook",
  "registry:theme",
  "registry:page",
  "registry:file",
]);

// Schema for each file in the "files" array.
const fileSchema = z
  .object({
    path: z.string(),
    content: z.string().optional(),
    type: registryTypeEnum,
    target: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If "type" is "registry:file" or "registry:page", then "target" is required.
    if (
      (data.type === "registry:file" || data.type === "registry:page") &&
      (data.target === undefined || data.target === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'For "registry:file" or "registry:page", the "target" field is required.',
        path: ["target"],
      });
    }
  });

// Schema for tailwind.config.
const tailwindConfigSchema = z
  .object({
    content: z.array(z.string()).optional(),
    theme: z.record(z.any()).optional(),
    plugins: z.array(z.string()).optional(),
  })
  .optional();

// Schema for tailwind.
const tailwindSchema = z
  .object({
    config: tailwindConfigSchema,
  })
  .optional();

// Schema for cssVars.
const cssVarsSchema = z
  .object({
    light: z.record(z.string()).optional(),
    dark: z.record(z.string()).optional(),
  })
  .optional();

// Overall registry item schema.
export const registryItemSchema = z.object({
  name: z.string(),
  type: registryTypeEnum,
  description: z.string().optional(),
  title: z.string().optional(),
  author: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(fileSchema).optional(),
  tailwind: tailwindSchema,
  cssVars: cssVarsSchema,
  meta: z.record(z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;
