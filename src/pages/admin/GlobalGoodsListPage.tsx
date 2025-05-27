
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalGoods, useDeleteGlobalGood } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { GlobalGoodRow } from '@/components/admin/GlobalGoodRow';
import { useI18n } from '@/hooks/useI18n';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';

// Helper to convert GlobalGoodFlat to expected format
const convertFlatToExpectedFormat = (good: GlobalGoodFlat) => ({
  ...good,
  id: good.ID,
  name: good.Name,
  summary: good.ProductOverview?.Summary || '',
  description: good.ProductOverview?.Description || '',
  sectors: good.GlobalGoodsType?.map(type => type.title || type.code || '') || [],
  countries: good.Reach?.ImplementationCountries?.map(country => country.names?.en?.short || '') || [],
});

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
  const processedGoods = globalGoods.map(good => convertFlatToExpectedFormat(good));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Manage Global Goods (Hybrid)</h1>
        <Button asChild>
          <Link to="/admin/global-goods/new">Add New Global Good</Link>
        </Button>
      </div>

      <AdminDataTable
        data={processedGoods}
        isLoading={isLoading}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        renderRow={(good: any) => (
          <GlobalGoodRow 
            key={good.ID}
            good={good}
            isSelected={selectedItems.includes(good.ID)}
            onToggleSelect={() => {
              const newSelectedItems = selectedItems.includes(good.ID)
                ? selectedItems.filter(id => id !== good.ID)
                : [...selectedItems, good.ID];
              setSelectedItems(newSelectedItems);
            }}
          />
        )}
      />
    </div>
  );
}
