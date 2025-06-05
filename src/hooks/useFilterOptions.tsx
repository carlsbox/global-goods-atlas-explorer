
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
    
    // Fix standards processing - handle both array and object formats
    let standardOptions: string[] = [];
    if (Array.isArray(standards)) {
      standardOptions = [...new Set(standards
        .map(s => {
          if (typeof s === 'string') return s;
          if (typeof s === 'object' && s !== null) return s.code || s.name;
          return null;
        })
        .filter((code): code is string => typeof code === 'string' && code.trim() !== '')
      )];
    } else if (standards && typeof standards === 'object') {
      // If standards is an object (like from reference data), get the keys
      standardOptions = Object.keys(standards).filter(key => key && key.trim() !== '');
    }

    console.log('Filter options:', {
      sdgOptions: sdgOptions.length,
      whoOptions: whoOptions.length,
      wmoOptions: wmoOptions.length,
      globalGoods: globalGoods.length,
      standards: standardOptions.length,
      standardsDebug: { 
        isArray: Array.isArray(standards), 
        keys: Array.isArray(standards) ? [] : Object.keys(standards || {}).slice(0, 5),
        standardOptionsPreview: standardOptions.slice(0, 5)
      }
    });

    return {
      sdgOptions,
      whoOptions,
      wmoOptions,
      standardOptions
    };
  }, [globalGoods, classifications, standards, sdgData]);
}
