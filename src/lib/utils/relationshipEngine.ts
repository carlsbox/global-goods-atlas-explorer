
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { UseCase } from '@/lib/types';

export interface RelatedContent {
  globalGoods: Array<{
    globalGood: GlobalGoodFlat;
    relationshipScore: number;
    sharedClassifications: string[];
    sharedStandards: string[];
  }>;
  useCases: Array<{
    useCase: UseCase;
    isDirectlyReferenced: boolean;
  }>;
}

export function calculateRelatedContent(
  currentGlobalGood: GlobalGoodFlat,
  allGlobalGoods: GlobalGoodFlat[],
  allUseCases: UseCase[]
): RelatedContent {
  // Find related global goods based on shared classifications and standards
  const relatedGlobalGoods = allGlobalGoods
    .filter(gg => gg.ID !== currentGlobalGood.ID)
    .map(globalGood => {
      let score = 0;
      const sharedClassifications: string[] = [];
      const sharedStandards: string[] = [];

      // Check for shared SDGs - extract codes for comparison
      const currentSDGs = (currentGlobalGood.Classifications?.SDGs || []).map(sdg => 
        typeof sdg === 'string' ? sdg : sdg.code
      );
      const otherSDGs = (globalGood.Classifications?.SDGs || []).map(sdg => 
        typeof sdg === 'string' ? sdg : sdg.code
      );
      const sharedSDGs = currentSDGs.filter(sdg => otherSDGs.includes(sdg));
      if (sharedSDGs.length > 0) {
        score += sharedSDGs.length * 3; // High weight for SDGs
        sharedClassifications.push(...sharedSDGs);
      }

      // Check for shared WHO classifications - extract codes
      const currentWHO = (currentGlobalGood.Classifications?.WHO || []).map(who => 
        typeof who === 'string' ? who : who.code
      );
      const otherWHO = (globalGood.Classifications?.WHO || []).map(who => 
        typeof who === 'string' ? who : who.code
      );
      const sharedWHO = currentWHO.filter(who => otherWHO.includes(who));
      if (sharedWHO.length > 0) {
        score += sharedWHO.length * 2;
        sharedClassifications.push(...sharedWHO);
      }

      // Check for shared DPI classifications - extract codes
      const currentDPI = (currentGlobalGood.Classifications?.DPI || []).map(dpi => 
        typeof dpi === 'string' ? dpi : dpi.code
      );
      const otherDPI = (globalGood.Classifications?.DPI || []).map(dpi => 
        typeof dpi === 'string' ? dpi : dpi.code
      );
      const sharedDPI = currentDPI.filter(dpi => otherDPI.includes(dpi));
      if (sharedDPI.length > 0) {
        score += sharedDPI.length * 2;
        sharedClassifications.push(...sharedDPI);
      }

      // Check for shared health standards - extract codes/names
      const currentHealthStandards = (currentGlobalGood.StandardsAndInteroperability?.HealthStandards || []).map(std => 
        typeof std === 'string' ? std : std.code || std.name
      );
      const otherHealthStandards = (globalGood.StandardsAndInteroperability?.HealthStandards || []).map(std => 
        typeof std === 'string' ? std : std.code || std.name
      );
      const sharedHealthStandards = currentHealthStandards.filter(std => otherHealthStandards.includes(std));
      if (sharedHealthStandards.length > 0) {
        score += sharedHealthStandards.length * 2;
        sharedStandards.push(...sharedHealthStandards);
      }

      // Check for shared interoperability standards - extract codes/names
      const currentInteropStandards = (currentGlobalGood.StandardsAndInteroperability?.Interoperability || []).map(std => 
        typeof std === 'string' ? std : std.code || std.name
      );
      const otherInteropStandards = (globalGood.StandardsAndInteroperability?.Interoperability || []).map(std => 
        typeof std === 'string' ? std : std.code || std.name
      );
      const sharedInteropStandards = currentInteropStandards.filter(std => otherInteropStandards.includes(std));
      if (sharedInteropStandards.length > 0) {
        score += sharedInteropStandards.length * 3; // Higher weight for interoperability
        sharedStandards.push(...sharedInteropStandards);
      }

      // Check for same global goods type
      const currentTypes = currentGlobalGood.GlobalGoodsType || [];
      const otherTypes = globalGood.GlobalGoodsType || [];
      const sharedTypes = currentTypes.filter(type => otherTypes.includes(type));
      if (sharedTypes.length > 0) {
        score += sharedTypes.length * 1;
      }

      return {
        globalGood,
        relationshipScore: score,
        sharedClassifications: [...new Set(sharedClassifications)],
        sharedStandards: [...new Set(sharedStandards)]
      };
    })
    .filter(item => item.relationshipScore > 0)
    .sort((a, b) => b.relationshipScore - a.relationshipScore)
    .slice(0, 6); // Limit to top 6 related global goods

  // Find use cases that reference this global good
  const relatedUseCases = allUseCases
    .map(useCase => {
      const isDirectlyReferenced = useCase.global_goods?.some(gg => 
        gg.id === currentGlobalGood.ID || gg.name === currentGlobalGood.Name
      ) || false;

      return {
        useCase,
        isDirectlyReferenced
      };
    })
    .filter(item => item.isDirectlyReferenced)
    .slice(0, 4); // Limit to 4 use cases

  return {
    globalGoods: relatedGlobalGoods,
    useCases: relatedUseCases
  };
}
