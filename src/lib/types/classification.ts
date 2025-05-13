
export interface Classification {
  code: string;
  title: string;
  group_code: string;
  group_name: string;
  authority: string;
}

export interface ClassificationTranslations {
  [code: string]: {
    title?: string;
  };
  group_names?: {
    [code: string]: string;
  };
  authority_names?: {
    [code: string]: string;
  };
}
