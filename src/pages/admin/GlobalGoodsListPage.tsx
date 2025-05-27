
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalGoods, useDeleteGlobalGood } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { GlobalGoodRow } from '@/components/admin/GlobalGoodRow';
import { useI18n } from '@/hooks/useI18n';
import { GlobalGoodFlat } from '@/lib/types/globalGoodFlat';

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
    // Add id property using ID
    id: good.ID,
    Name: good.Name || '',
    // ProductOverview is an object, ensure nested fields exist
    ProductOverview: {
      ...good.ProductOverview,
      Summary: good.ProductOverview?.Summary || '',
      Description: good.ProductOverview?.Description || '',
    },
    // GlobalGoodsType is an array (sector equivalent)
    GlobalGoodsType: good.GlobalGoodsType || [],
    // Countries: from Reach.ImplementationCountries
    Reach: {
      ...good.Reach,
      ImplementationCountries: good.Reach?.ImplementationCountries || [],
    },
    // Technologies: not present in GlobalGoodFlat, so omit
  }));

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
        renderRow={(good: GlobalGoodFlat & { id: string }) => (
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
