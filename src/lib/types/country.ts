
export interface CountryData {
  /** Country code (ISO 3166-1 alpha-2) */
  code: string;
  /** ISO 3-letter code */
  iso_code?: string;
  /** Country name */
  name: {
    /** Common name */
    common: string;
    /** Official name */
    official: string;
    /** Short name */
    short: string;
  };
  /** Country coordinates */
  coordinates?: [number, number];
  /** Country flag URL */
  flag?: string;
  /** Region */
  region?: string;
  /** Sub-region */
  subregion?: string;
}
