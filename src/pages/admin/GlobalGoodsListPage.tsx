
// This is a mock implementation assuming the original file exists
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalGoods, useDeleteGlobalGood } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { GlobalGoodRow } from '@/components/admin/GlobalGoodRow';
import { useI18n } from '@/hooks/useI18n';

export default function GlobalGoodsListPage() {
  const { data: globalGoods = [], isLoading } = useGlobalGoods();
  const { getText } = useI18n();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const deleteMutation = useDeleteGlobalGood();

  // Handle deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete global good:", error);
    }
  };

  // Process data to ensure we have all required fields for the component
  const processedGoods = globalGoods.map(good => ({
    ...good,
    // Ensure these fields exist or have defaults
    name: good.name || '',
    description: good.description || '',
    summary: good.summary || '',
    details: good.details || '',
    sector: good.sector || [],
    countries: good.countries || [],
    technologies: good.technologies || [],
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Manage Global Goods</h1>
        <Button asChild>
          <Link to="/admin/global-goods/new">Add New Global Good</Link>
        </Button>
      </div>

      <AdminDataTable
        data={processedGoods}
        isLoading={isLoading}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        renderRow={(good) => (
          <GlobalGoodRow 
            key={good.id}
            good={good}
            name={getText(good.name)}
            description={getText(good.description)}
            onDelete={() => handleDelete(good.id)}
          />
        )}
      />
    </div>
  );
}
