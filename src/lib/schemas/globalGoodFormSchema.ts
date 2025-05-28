
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
  url: z.string().url("Invalid URL format").optional(),
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

// Language item
const languageItem = z.object({
  code: z.string(),
  name: z.string(),
});

// Screenshot item
const screenshotItem = z.object({
  url: z.string().url("Invalid URL format").optional(),
  description: z.string().optional(),
});

// Implementation country
const implementationCountry = z.object({
  iso_code: z.string(),
  type: z.string().optional(),
  names: z.object({
    en: z.object({
      short: z.string(),
      formal: z.string().optional(),
    }),
  }),
});

// Score item
const scoreItem = z.object({
  year: z.number(),
  global_utility: z.number().optional(),
  community_support: z.number().optional(),
  maturity_of_gg: z.number().optional(),
  inclusive_design: z.number().optional(),
  climate_resilience: z.number().optional(),
  low_carbon: z.number().optional(),
});

// Main global good form schema with flat structure
export const globalGoodFormSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: multilingualText,
  summary: multilingualText,
  description: multilingualText,
  globalGoodsType: z.array(globalGoodType).optional(),
  licenses: z.array(urlItem).optional(),
  repositories: z.array(urlItem).optional(),
  primaryFunctionality: z.string().optional(),
  users: z.string().optional(),
  languages: z.array(languageItem).optional(),
  screenshots: z.array(screenshotItem).optional(),
  implementationCountries: z.array(implementationCountry).optional(),
  scores: z.array(scoreItem).optional(),
  website: urlItem.optional(),
  logo: z.string().optional(),
  trl: z.number().min(1).max(9).optional(),
  lastUpdated: z.string().optional(),
});

export type GlobalGoodFormValues = z.infer<typeof globalGoodFormSchema>;
