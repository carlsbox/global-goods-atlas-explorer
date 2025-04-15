
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminContentLayout } from '@/components/admin/AdminContentLayout';
import { useGlobalGoods } from '@/lib/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function GlobalGoodsManagementPage() {
  const { data: globalGoods = [], isLoading } = useGlobalGoods();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGoods = globalGoods.filter((good) =>
    good.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    good.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <AdminContentLayout
        title="Manage Global Goods"
        description="Add, edit, or remove global goods from the catalog"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search global goods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Global Good
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading global goods...</div>
        ) : filteredGoods.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No global goods found</div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Sectors</TableHead>
                  <TableHead className="hidden md:table-cell">Countries</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGoods.map((good) => (
                  <TableRow key={good.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {good.logo ? (
                          <img 
                            src={good.logo} 
                            alt={good.name} 
                            className="h-8 w-8 mr-2 rounded-sm object-contain"
                          />
                        ) : (
                          <div className="h-8 w-8 bg-primary/10 rounded-sm mr-2" />
                        )}
                        <span>{good.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {good.sector?.slice(0, 2).map((sector) => (
                          <Badge key={sector} variant="outline" className="text-xs">
                            {sector}
                          </Badge>
                        ))}
                        {(good.sector?.length || 0) > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{(good.sector?.length || 0) - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {good.countries?.length || 0} countries
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </AdminContentLayout>
    </AdminLayout>
  );
}
