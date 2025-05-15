
import { z } from 'zod';

// Helper for multilingual text fields
const multilingualText = z.object({
  en: z.string().optional(),
  fr: z.string().optional(),
  es: z.string().optional(),
}).refine((data) => Object.values(data).some(value => !!value), {
  message: "At least one language must be provided",
});

// Website/URL type
const urlItem = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  url: z.string().url("Invalid URL format").min(1, "URL is required"),
  description: z.string().optional(),
});

// Contact information
const contact = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  role: z.string().optional(),
});

// Global good type
const globalGoodType = z.object({
  code: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

// Define the core metadata schema
export const coreMetadataSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: multilingualText,
  logo: z.string().optional(),
  website: z.array(urlItem).optional(),
  globalGoodsType: z.array(globalGoodType).optional(),
  sourceCode: z.array(urlItem).optional(),
  license: z.array(urlItem).optional(),
  demoLink: z.array(urlItem).optional(),
  contact: z.array(contact).optional(),
});

// Define the product overview schema
export const productOverviewSchema = z.object({
  summary: multilingualText,
  description: multilingualText,
  details: multilingualText,
  primaryFunctionality: z.string().optional(),
  users: z.string().optional(),
  languages: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
    })
  ).optional(),
  screenshots: z.array(
    z.object({
      url: z.string().url("Invalid URL format").optional(),
      description: z.string().optional(),
    })
  ).optional(),
});

// Main global good schema
export const globalGoodFormSchema = z.object({
  coreMetadata: coreMetadataSchema,
  productOverview: productOverviewSchema,
  // We'll add other sections as needed
  id: z.string().min(1, "ID is required"),
  name: multilingualText,
  summary: multilingualText,
  description: multilingualText,
  details: multilingualText,
  lastUpdated: z.string().optional(),
});

export type GlobalGoodFormValues = z.infer<typeof globalGoodFormSchema>;
