import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalGood, useCreateGlobalGood, useUpdateGlobalGood } from '@/lib/api';
import { GlobalGood } from '@/lib/types';
import { createEmptyMultilingualText, ensureMultilingualText } from '@/utils/defaultValues';
import { toast } from '@/components/ui/use-toast';

export default function GlobalGoodFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  // Fetch global good data if editing
  const { data: globalGoodData, isLoading } = useGlobalGood(id, { enabled: isEditing });
  
  // Form state
  const [formData, setFormData] = useState<Partial<GlobalGood>>({
    name: createEmptyMultilingualText(),
    summary: createEmptyMultilingualText(),
    description: createEmptyMultilingualText(),
    details: createEmptyMultilingualText(),
    sector: [],
    countries: [],
    technologies: [],
  });

  // Initialize form data from fetched data
  React.useEffect(() => {
    if (globalGoodData) {
      setFormData({
        ...globalGoodData,
        // Ensure multilingual fields are properly formatted
        name: ensureMultilingualText(globalGoodData.name),
        summary: ensureMultilingualText(globalGoodData.summary),
        description: ensureMultilingualText(globalGoodData.description),
        details: ensureMultilingualText(globalGoodData.details),
      });
    }
  }, [globalGoodData]);

  // Update and create mutations
  const createMutation = useCreateGlobalGood();
  const updateMutation = useUpdateGlobalGood();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Ensure required fields
      if (!formData.name || !formData.description || !formData.summary || !formData.details) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      // Add current timestamp
      const dataToSubmit = {
        ...formData,
        lastUpdated: new Date().toISOString(),
      } as GlobalGood;

      if (isEditing && id) {
        // Update existing global good
        await updateMutation.mutateAsync({
          id,
          data: dataToSubmit
        });
        toast({
          title: "Success",
          description: "Global good updated successfully"
        });
      } else {
        // Create new global good
        const result = await createMutation.mutateAsync({
          ...dataToSubmit,
          id: `gg-${Date.now()}` // Generate a simple ID
        });
        toast({
          title: "Success",
          description: "Global good created successfully"
        });
      }

      // Redirect back to list
      navigate('/admin/global-goods');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save global good",
        variant: "destructive"
      });
      console.error(error);
    }
  };

  // Form field handler
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{isEditing ? 'Edit' : 'Create'} Global Good</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields would go here */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
