
/**
 * Convert ISO country code to flag emoji
 * @param isoCode - ISO 3166-1 alpha-2 country code
 * @returns Flag emoji or fallback display
 */
export function getCountryFlag(isoCode: string): { emoji: string | null; fallback: string } {
  if (!isoCode || isoCode.length !== 2) {
    return { emoji: null, fallback: isoCode?.toUpperCase() || '??' };
  }

  try {
    // Convert ISO code to flag emoji using Unicode regional indicator symbols
    const codePoints = isoCode
      .toUpperCase()
      .split('')
      .map(char => 0x1F1E6 + char.charCodeAt(0) - 'A'.charCodeAt(0));
    
    const flagEmoji = String.fromCodePoint(...codePoints);
    return { emoji: flagEmoji, fallback: isoCode.toUpperCase() };
  } catch (error) {
    return { emoji: null, fallback: isoCode.toUpperCase() };
  }
}

/**
 * Component to display country flag with fallback
 */
interface CountryFlagProps {
  isoCode: string;
  className?: string;
}

export function CountryFlag({ isoCode, className = "" }: CountryFlagProps) {
  const { emoji, fallback } = getCountryFlag(isoCode);
  
  if (emoji) {
    return (
      <span 
        className={`text-lg ${className}`}
        title={`${fallback} flag`}
        aria-label={`${fallback} flag`}
      >
        {emoji}
      </span>
    );
  }
  
  return (
    <div className={`w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-xs font-medium ${className}`}>
      {fallback}
    </div>
  );
}
