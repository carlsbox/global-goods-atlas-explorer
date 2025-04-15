
import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminContentLayout } from '@/components/admin/AdminContentLayout';
import { useUseCases } from '@/lib/api';
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

export default function UseCasesManagementPage() {
  const { data: useCases = [], isLoading } = useUseCases();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUseCases = useCases.filter((useCase) =>
    useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    useCase.country.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminLayout>
      <AdminContentLayout
        title="Manage Use Cases"
        description="Add, edit, or remove use cases"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search use cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Use Case
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading use cases...</div>
        ) : filteredUseCases.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No use cases found</div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Country</TableHead>
                  <TableHead className="hidden md:table-cell">Sector</TableHead>
                  <TableHead className="hidden md:table-cell">Year</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUseCases.map((useCase) => (
                  <TableRow key={useCase.id}>
                    <TableCell className="font-medium">
                      {useCase.title}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {useCase.country}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{useCase.sector}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {useCase.year}
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
