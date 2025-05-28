
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalGoodFlat } from '@/lib/api/globalGoodsFlat';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';
import { toast } from '@/hooks/use-toast';
import { useI18n } from '@/hooks/useI18n';
import { LoadingState } from '@/components/global-good/LoadingState';
import { ErrorState } from '@/components/global-good/ErrorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlobalGoodFlatForm } from '@/components/admin/form/GlobalGoodFlatForm';
import { GlobalGoodFlatFormValues } from '@/lib/schemas/globalGoodFlatFormSchema';

export default function GlobalGoodFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { t } = useI18n();
  
  // Fetch global good data if editing using flat loader
  const { data: globalGoodData, isLoading, error, refetch } = useGlobalGoodFlat(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submission handler
  const handleSubmit = async (formData: GlobalGoodFlatFormValues) => {
    setIsSubmitting(true);
    try {
      // For now, just log the data - in a real implementation this would save to backend
      console.log('Saving GlobalGoodFlat data:', formData);
      
      toast({
        title: t('admin.success'),
        description: isEditing ? t('admin.globalGoods.updated') : t('admin.globalGoods.created')
      });

      // Redirect back to list
      navigate('/admin/global-goods');
    } catch (error) {
      toast({
        title: t('admin.error'),
        description: t('admin.failedToSave'),
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
            {isEditing ? t('admin.globalGoods.edit') : t('admin.globalGoods.create')} (Flat Structure)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GlobalGoodFlatForm
            initialData={globalGoodData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
