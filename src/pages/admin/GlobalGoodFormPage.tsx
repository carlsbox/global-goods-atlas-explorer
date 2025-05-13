
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalGood, useCreateGlobalGood, useUpdateGlobalGood } from '@/lib/api';
import { GlobalGood } from '@/lib/types';
import { ensureMultilingualText } from '@/lib/translationUtils';
import { toast } from '@/components/ui/use-toast';
import { useI18n } from '@/hooks/useI18n';
import { LoadingState } from '@/components/global-good/LoadingState';
import { ErrorState } from '@/components/global-good/ErrorState';

export default function GlobalGoodFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { t, language } = useI18n();
  
  // Fetch global good data if editing
  const { data: globalGoodData, isLoading, error, refetch } = useGlobalGood(id);
  
  // Form state
  const [formData, setFormData] = useState<Partial<GlobalGood>>({
    name: { en: '', fr: '', es: '' },
    summary: { en: '', fr: '', es: '' },
    description: { en: '', fr: '', es: '' },
    details: { en: '', fr: '', es: '' },
    sector: [],
    countries: [],
    technologies: [],
  });

  // Initialize form data from fetched data
  useEffect(() => {
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
          title: t('forms.validationError'),
          description: t('forms.fillAllRequired'),
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
          title: t('admin.success'),
          description: t('admin.globalGoodUpdated')
        });
      } else {
        // Create new global good
        await createMutation.mutateAsync({
          ...dataToSubmit,
          id: `gg-${Date.now()}` // Generate a simple ID
        } as GlobalGood);
        toast({
          title: t('admin.success'),
          description: t('admin.globalGoodCreated')
        });
      }

      // Redirect back to list
      navigate('/admin/global-goods');
    } catch (error) {
      toast({
        title: t('admin.error'),
        description: t('admin.failedToSave'),
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
    return <LoadingState message={t('admin.loadingGlobalGood')} />;
  }

  if (error && isEditing) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div>
      <h1>{isEditing ? t('admin.editGlobalGood') : t('admin.createGlobalGood')}</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields would go here */}
        <button type="submit">{t('forms.save')}</button>
      </form>
    </div>
  );
}
