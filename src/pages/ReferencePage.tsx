import React, { useState } from 'react';
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ReferenceOverview } from "@/components/reference/ReferenceOverview";
import { ReferenceDetailView } from "@/components/reference/ReferenceDetailView";
import { REFERENCE_CATEGORIES, ReferenceDataCategory, loadReferenceData } from "@/lib/simpleReferenceLoader";

const ReferencePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ReferenceDataCategory | null>(null);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategorySelect = async (category: ReferenceDataCategory) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await loadReferenceData(category.dataPath);
      setCategoryData(data);
      setSelectedCategory(category);
    } catch (err) {
      setError(`Failed to load data for ${category.name}`);
      console.error('Error loading category data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setCategoryData(null);
    setError(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive">{error}</p>
        <button 
          onClick={handleBack}
          className="mt-4 text-primary hover:underline"
        >
          Back to Overview
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedCategory && categoryData ? (
        <ReferenceDetailView 
          category={selectedCategory}
          data={categoryData}
          onBack={handleBack}
        />
      ) : (
        <ReferenceOverview 
          categories={REFERENCE_CATEGORIES}
          onCategorySelect={handleCategorySelect}
        />
      )}
    </div>
  );
};

export default ReferencePage;