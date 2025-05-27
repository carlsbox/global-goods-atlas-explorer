
import { useMemo } from "react";

interface UseFilterOptionsProps {
  globalGoods: any[];
  classifications: any[];
  standards: any[];
  sdgData: any[];
}

export function useFilterOptions({
  globalGoods,
  classifications,
  standards,
  sdgData
}: UseFilterOptionsProps) {
  return useMemo(() => {
    // Get SDG options from the loaded SDG data
    const sdgOptions = sdgData
      .filter(sdg => sdg.code && sdg.code.trim() !== '')
      .map(sdg => ({ code: sdg.code, title: sdg.title }));
    
    const whoOptions = [...new Set(classifications
      .filter(c => c.authority === 'WHO' && c.code && c.code.trim() !== '')
      .map(c => c.code)
    )];
    
    const wmoOptions = [...new Set(classifications
      .filter(c => c.authority === 'WMO' && c.code && c.code.trim() !== '')
      .map(c => c.code)
    )];
    
    const standardOptions = [...new Set(standards
      .filter(s => s.code && s.code.trim() !== '')
      .map(s => s.code)
    )];

    console.log('Filter options:', {
      sdgOptions: sdgOptions.length,
      whoOptions: whoOptions.length,
      wmoOptions: wmoOptions.length,
      globalGoods: globalGoods.length,
      standards: standardOptions.length
    });

    return {
      sdgOptions,
      whoOptions,
      wmoOptions,
      standardOptions
    };
  }, [globalGoods, classifications, standards, sdgData]);
}
