
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LanguageCode } from "@/lib/types"
import { MultilingualText } from "./types/commonTypes"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get text from a multilingual field based on the specified language
 */
export function getMultilingualText(
  field: string | MultilingualText | undefined,
  language: LanguageCode = 'en'
): string {
  if (field === undefined || field === null) {
    return '';
  }
  
  if (typeof field === 'string') {
    return field;
  }
  
  // Try to get the text in the specified language
  if (field[language]) {
    return field[language];
  }
  
  // Fallback to English
  if (field.en) {
    return field.en;
  }
  
  // Last resort - return the first value we find
  const firstValue = Object.values(field)[0];
  return firstValue || '';
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (e) {
    return dateString;
  }
}
