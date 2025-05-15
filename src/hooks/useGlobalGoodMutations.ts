import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GlobalGood } from '@/lib/types';

// Function to create a new global good
async function createGlobalGood(newGlobalGood: GlobalGood): Promise<GlobalGood> {
  try {
    // In a real app, this would be an API call
    // For now, we'll simulate storing it locally
    const response = await fetch('/data/global-goods/globalgood_db.json');
    const currentData = await response.json();
    
    // Add the new global good
    const updatedData = [...currentData, formatGlobalGoodForDB(newGlobalGood)];
    
    // In a real app, this would save to the server
    // For demo purposes, we'll log what would be saved
    console.log('Creating new global good:', newGlobalGood);
    console.log('Updated database would be:', updatedData);
    
    return newGlobalGood;
  } catch (error) {
    console.error('Error creating global good:', error);
    throw new Error('Failed to create global good');
  }
}

// Function to update an existing global good
async function updateGlobalGood({ id, data }: { id: string; data: GlobalGood }): Promise<GlobalGood> {
  try {
    // In a real app, this would be an API call
    // For now, we'll simulate updating it locally
    const response = await fetch('/data/global-goods/globalgood_db.json');
    const currentData = await response.json();
    
    // Find and update the global good
    const updatedData = currentData.map((item: any) => 
      item.CoreMetadata?.ID === id ? formatGlobalGoodForDB(data) : item
    );
    
    // In a real app, this would save to the server
    // For demo purposes, we'll log what would be saved
    console.log('Updating global good:', id, data);
    console.log('Updated database would be:', updatedData);
    
    return data;
  } catch (error) {
    console.error('Error updating global good:', error);
    throw new Error('Failed to update global good');
  }
}

// Helper function to format global good data for database storage
function formatGlobalGoodForDB(data: GlobalGood): any {
  // Transform from our app structure to the DB structure
  return {
    CoreMetadata: {
      ID: data.id,
      Name: data.name,
      Logo: data.logo,
      Website: data.coreMetadata?.website || [],
      GlobalGoodsType: data.coreMetadata?.globalGoodsType || [],
      SourceCode: data.coreMetadata?.sourceCode || [],
      License: data.coreMetadata?.license || [],
      DemoLink: data.coreMetadata?.demoLink || [],
      Contact: data.coreMetadata?.contact || []
    },
    ProductOverview: {
      Summary: data.summary,
      Description: data.description,
      Details: data.details,
      PrimaryFunctionality: data.productOverview?.primaryFunctionality || '',
      Users: data.productOverview?.users || '',
      Languages: data.productOverview?.languages || [],
      Screenshots: data.productOverview?.screenshots || []
    },
    // Other sections would be similarly formatted
  };
}

// Hook for creating a global good
export function useCreateGlobalGood() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createGlobalGood,
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['globalGoods'] });
    }
  });
}

// Hook for updating a global good
export function useUpdateGlobalGood() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateGlobalGood,
    onSuccess: (data) => {
      // Invalidate relevant queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['globalGoods'] });
      queryClient.invalidateQueries({ queryKey: ['globalGood', data.id] });
    }
  });
}
