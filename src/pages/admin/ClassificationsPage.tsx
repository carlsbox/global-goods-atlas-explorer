import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle, Edit, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useClassifications } from '@/lib/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Classification } from '@/lib/types';

interface ClassificationWithSubcategories {
  id: string;
  name: string;
  description: string;
  subcategories: {
    id: string;
    name: string;
    description: string;
  }[];
}

const ClassificationsPage = () => {
  const { toast } = useToast();
  const { data: classifications = [] } = useClassifications();
  const [showDialog, setShowDialog] = useState(false);
  const [currentClassification, setCurrentClassification] = useState<ClassificationWithSubcategories | null>(null);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  // Group classifications by authority and group code to display in hierarchical form
  const groupedClassifications = React.useMemo(() => {
    const grouped: Record<string, Record<string, Classification[]>> = {};
    
    classifications.forEach(item => {
      if (!grouped[item.authority]) {
        grouped[item.authority] = {};
      }
      
      if (!grouped[item.authority][item.group_code]) {
        grouped[item.authority][item.group_code] = [];
      }
      
      grouped[item.authority][item.group_code].push(item);
    });
    
    return grouped;
  }, [classifications]);

  const handleAddClassification = () => {
    setDialogMode('add');
    setCurrentClassification({
      id: '',
      name: '',
      description: '',
      subcategories: []
    });
    setShowDialog(true);
  };

  const handleEditClassification = (classification: Classification) => {
    // Convert Classification to ClassificationWithSubcategories format
    setDialogMode('edit');
    setCurrentClassification({
      id: classification.code,
      name: classification.title,
      description: classification.group_name,
      subcategories: []
    });
    setShowDialog(true);
  };

  const handleSaveClassification = () => {
    toast({
      title: dialogMode === 'add' ? 'Classification Added' : 'Classification Updated',
      description: `The classification has been ${dialogMode === 'add' ? 'added' : 'updated'} successfully.`,
    });
    setShowDialog(false);
    // In a real app, this would save the data to the backend
  };

  const handleDeleteClassification = (id: string) => {
    if (confirm('Are you sure you want to delete this classification?')) {
      toast({
        title: 'Classification Deleted',
        description: 'The classification has been deleted successfully.',
      });
      // In a real app, this would delete the data from the backend
    }
  };

  if (classifications.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Classifications Management</h1>
        <Button onClick={handleAddClassification}>
          <PlusCircle className="mr-2 h-5 w-5" /> Add Classification
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WHO Digital Health Interventions Classifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="hierarchical">Hierarchical View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Authority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classifications.map((classification) => (
                    <TableRow key={classification.code}>
                      <TableCell>{classification.code}</TableCell>
                      <TableCell>{classification.title}</TableCell>
                      <TableCell>{classification.group_name}</TableCell>
                      <TableCell>{classification.authority}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditClassification(classification)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteClassification(classification.code)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="hierarchical" className="mt-4">
              {Object.entries(groupedClassifications).map(([authority, groups]) => (
                <div key={authority} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{authority}</h3>
                  
                  {Object.entries(groups).map(([groupCode, items]) => (
                    <Card key={groupCode} className="mb-4">
                      <CardHeader>
                        <CardTitle>{items[0].group_name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item.code} className="bg-muted p-3 rounded-md">
                              <div className="font-medium">{item.code} | {item.title}</div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'add' ? 'Add New Classification' : 'Edit Classification'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="id" className="text-sm font-medium">ID</label>
                <Input 
                  id="id" 
                  value={currentClassification?.id || ''}
                  onChange={(e) => setCurrentClassification({
                    ...currentClassification, 
                    id: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input 
                  id="name" 
                  value={currentClassification?.name || ''}
                  onChange={(e) => setCurrentClassification({
                    ...currentClassification, 
                    name: e.target.value
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input 
                id="description" 
                value={currentClassification?.description || ''}
                onChange={(e) => setCurrentClassification({
                  ...currentClassification, 
                  description: e.target.value
                })}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategories</label>
              <div className="border rounded-md p-4 space-y-3">
                {currentClassification?.subcategories?.map((sub: any, idx: number) => (
                  <div key={idx} className="space-y-2 pb-3 border-b">
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        placeholder="ID" 
                        value={sub.id || ''}
                        onChange={(e) => {
                          const updated = [...currentClassification.subcategories];
                          updated[idx] = { ...updated[idx], id: e.target.value };
                          setCurrentClassification({
                            ...currentClassification,
                            subcategories: updated
                          });
                        }}
                      />
                      <Input 
                        placeholder="Name" 
                        value={sub.name || ''}
                        onChange={(e) => {
                          const updated = [...currentClassification.subcategories];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setCurrentClassification({
                            ...currentClassification,
                            subcategories: updated
                          });
                        }}
                      />
                    </div>
                    <Input 
                      placeholder="Description" 
                      value={sub.description || ''}
                      onChange={(e) => {
                        const updated = [...currentClassification.subcategories];
                        updated[idx] = { ...updated[idx], description: e.target.value };
                        setCurrentClassification({
                          ...currentClassification,
                          subcategories: updated
                        });
                      }}
                    />
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    const updated = [...(currentClassification.subcategories || [])];
                    updated.push({ id: '', name: '', description: '' });
                    setCurrentClassification({
                      ...currentClassification,
                      subcategories: updated
                    });
                  }}
                >
                  <PlusCircle className="mr-1 h-4 w-4" /> Add Subcategory
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveClassification}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassificationsPage;
