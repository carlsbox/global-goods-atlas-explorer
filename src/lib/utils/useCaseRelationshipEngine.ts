
import { UseCase } from '@/lib/types/useCase';

export interface RelatedUseCase {
  useCase: UseCase;
  relationshipScore: number;
  sharedElements: {
    classifications: string[];
    standards: string[];
    globalGoods: string[];
    actors: string[];
  };
  relationshipReasons: string[];
}

export function calculateRelatedUseCases(
  currentUseCase: UseCase,
  allUseCases: UseCase[]
): RelatedUseCase[] {
  return allUseCases
    .filter(uc => uc.id !== currentUseCase.id)
    .map(useCase => {
      let score = 0;
      const sharedElements = {
        classifications: [] as string[],
        standards: [] as string[],
        globalGoods: [] as string[],
        actors: [] as string[]
      };
      const relationshipReasons = [] as string[];

      // Check shared SDG classifications (5 points each)
      if (currentUseCase.classifications?.sdg && useCase.classifications?.sdg) {
        if (currentUseCase.classifications.sdg === useCase.classifications.sdg) {
          score += 5;
          sharedElements.classifications.push(currentUseCase.classifications.sdg);
          relationshipReasons.push(`Both target ${currentUseCase.classifications.sdg}`);
        }
      }

      // Check shared WHO system classifications (3 points each)
      if (currentUseCase.classifications?.who_system && useCase.classifications?.who_system) {
        if (currentUseCase.classifications.who_system === useCase.classifications.who_system) {
          score += 3;
          sharedElements.classifications.push(currentUseCase.classifications.who_system);
          relationshipReasons.push(`Same WHO system classification`);
        }
      }

      // Check shared WMO categories (2 points each)
      if (currentUseCase.classifications?.wmo_category && useCase.classifications?.wmo_category) {
        if (currentUseCase.classifications.wmo_category === useCase.classifications.wmo_category) {
          score += 2;
          sharedElements.classifications.push(currentUseCase.classifications.wmo_category);
          relationshipReasons.push(`Same WMO category`);
        }
      }

      // Check shared standards (4 points each)
      const currentStandards = currentUseCase.standards || [];
      const otherStandards = useCase.standards || [];
      const sharedStandards = currentStandards.filter(std => otherStandards.includes(std));
      if (sharedStandards.length > 0) {
        score += sharedStandards.length * 4;
        sharedElements.standards.push(...sharedStandards);
        if (sharedStandards.length === 1) {
          relationshipReasons.push(`Both use ${sharedStandards[0]} standard`);
        } else {
          relationshipReasons.push(`Share ${sharedStandards.length} technical standards`);
        }
      }

      // Check shared global goods (3 points each)
      const currentGoods = currentUseCase.global_goods || [];
      const otherGoods = useCase.global_goods || [];
      const sharedGoods = currentGoods.filter(cg => 
        otherGoods.some(og => og.id === cg.id || og.name === cg.name)
      );
      if (sharedGoods.length > 0) {
        score += sharedGoods.length * 3;
        sharedElements.globalGoods.push(...sharedGoods.map(g => g.name));
        if (sharedGoods.length === 1) {
          relationshipReasons.push(`Both use ${sharedGoods[0].name}`);
        } else {
          relationshipReasons.push(`Share ${sharedGoods.length} global goods`);
        }
      }

      // Check for similar actors/stakeholders (2 points for keyword matches)
      const currentActors = (currentUseCase.actors || '').toLowerCase();
      const otherActors = (useCase.actors || '').toLowerCase();
      const actorKeywords = [
        'community health worker', 'health worker', 'chw',
        'district health', 'ministry of health', 'health authorities',
        'community members', 'patients', 'healthcare providers'
      ];
      
      const sharedActorTypes = actorKeywords.filter(keyword => 
        currentActors.includes(keyword) && otherActors.includes(keyword)
      );
      if (sharedActorTypes.length > 0) {
        score += sharedActorTypes.length * 2;
        sharedElements.actors.push(...sharedActorTypes);
        relationshipReasons.push('Similar stakeholders and actors');
      }

      // Content similarity based on purpose/scope keywords (1-3 points)
      const currentContent = `${currentUseCase.purpose || ''} ${currentUseCase.scope || ''}`.toLowerCase();
      const otherContent = `${useCase.purpose || ''} ${useCase.scope || ''}`.toLowerCase();
      
      const healthKeywords = [
        'primary healthcare', 'health services', 'health data', 'health education',
        'maternal health', 'child health', 'disease surveillance', 'health monitoring',
        'telemedicine', 'digital health', 'health platform', 'health system'
      ];
      
      const sharedHealthConcepts = healthKeywords.filter(keyword =>
        currentContent.includes(keyword) && otherContent.includes(keyword)
      );
      if (sharedHealthConcepts.length > 0) {
        score += Math.min(sharedHealthConcepts.length, 3);
        if (sharedHealthConcepts.length >= 2) {
          relationshipReasons.push('Similar health focus areas');
        }
      }

      // Geographic/sectoral similarity (legacy fields, 1 point each)
      if (currentUseCase.country && useCase.country && currentUseCase.country === useCase.country) {
        score += 1;
        relationshipReasons.push(`Both implemented in ${currentUseCase.country}`);
      }
      
      if (currentUseCase.sector && useCase.sector && currentUseCase.sector === useCase.sector) {
        score += 1;
        relationshipReasons.push(`Same sector focus`);
      }

      return {
        useCase,
        relationshipScore: score,
        sharedElements,
        relationshipReasons: [...new Set(relationshipReasons)] // Remove duplicates
      };
    })
    .filter(item => item.relationshipScore > 0) // Only include related use cases
    .sort((a, b) => b.relationshipScore - a.relationshipScore) // Sort by relevance
    .slice(0, 6); // Limit to top 6 related use cases
}
