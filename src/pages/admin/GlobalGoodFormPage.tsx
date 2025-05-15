
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalGood, useCreateGlobalGood, useUpdateGlobalGood } from '@/lib/api';
import { GlobalGood } from '@/lib/types';
import { ensureMultilingualText } from '@/lib/translationUtils';
import { toast } from '@/components/ui/use-toast';
import { useI18n } from '@/hooks/useI18n';
import { LoadingState } from '@/components/global-good/LoadingState';
import { ErrorState } from '@/components/global-good/ErrorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlobalGoodForm } from '@/components/admin/form/GlobalGoodForm';
import { GlobalGoodFormValues } from '@/lib/schemas/globalGoodFormSchema';

export default function GlobalGoodFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { t, language } = useI18n();
  
  // Fetch global good data if editing
  const { data: globalGoodData, isLoading, error, refetch } = useGlobalGood(id);
  
  // Update and create mutations
  const createMutation = useCreateGlobalGood();
  const updateMutation = useUpdateGlobalGood();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // Form submission handler
  const handleSubmit = async (formData: GlobalGoodFormValues) => {
    try {
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
          description: t('admin.globalGoods.updated')
        });
      } else {
        // Create new global good
        await createMutation.mutateAsync({
          ...dataToSubmit,
          id: formData.id || `gg-${Date.now()}` // Generate a simple ID if not provided
        } as GlobalGood);
        toast({
          title: t('admin.success'),
          description: t('admin.globalGoods.created')
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

  if (isLoading) {
    return <LoadingState message={t('admin.loadingGlobalGood')} />;
  }

  if (error && isEditing) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="container py-6 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? t('admin.globalGoods.edit') : t('admin.globalGoods.create')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GlobalGoodForm
            initialData={globalGoodData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
