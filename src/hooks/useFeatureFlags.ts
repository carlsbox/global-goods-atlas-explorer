import { getConfig } from '@/lib/config';

interface FeatureFlags {
  isUseCasesEnabled: boolean;
  isUseCasesInNavigation: boolean;
  isUseCasesInGlobalGoods: boolean;
  isUseCasesInHomePage: boolean;
  useCasesRoutes: string[];
}

export function useFeatureFlags(): FeatureFlags {
  const config = getConfig();
  const useCasesConfig = config.features?.useCases;
  
  return {
    isUseCasesEnabled: useCasesConfig?.enabled ?? true,
    isUseCasesInNavigation: useCasesConfig?.showInNavigation ?? true,
    isUseCasesInGlobalGoods: useCasesConfig?.showInGlobalGoods ?? true,
    isUseCasesInHomePage: useCasesConfig?.showInHomePage ?? false,
    useCasesRoutes: useCasesConfig?.routes ?? ['/use-cases', '/use-cases/:id']
  };
}