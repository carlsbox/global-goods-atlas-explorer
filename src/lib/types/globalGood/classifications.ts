/**
 * Classifications for a global good.
 */
export interface Classifications {
  /** SDG classifications */
  sdgs?: Array<{
    code: string;
    title: string;
  }>;
  /** WHO classifications */
  who?: Array<{
    code: string;
    title: string;
    groupCode: string;
    groupName: string;
    authority: string;
  }>;
  /** WMO classifications */
  wmo?: Array<{
    code: string;
    title: string;
    groupCode: string;
    groupName: string;
    authority: string;
  }>;
  /** DPI classifications */
  dpi?: Array<{
    code: string;
    title: string;
    groupCode: string;
    groupName: string;
    authority: string;
  }>;
} 