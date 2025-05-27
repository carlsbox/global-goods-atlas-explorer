
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tag, 
  Shield, 
  Plus, 
  Edit, 
  Trash,
  Search,
  BarChart3
} from "lucide-react";

export default function ReferenceDataPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real implementation, these would come from API calls
  const classifications = {
    WHO: [
      { code: "WHO-A1", title: "Public Health Surveillance", group: "Health Systems" },
      { code: "WHO-A2", title: "Disease Outbreak Management", group: "Health Systems" },
      { code: "WHO-B1", title: "Clinical Care", group: "Clinical Systems" }
    ],
    DPI: [
      { code: "DPI-001", title: "Identity Systems", group: "Digital Identity" },
      { code: "DPI-002", title: "Payment Systems", group: "Digital Payments" }
    ],
    WMO: [
      { code: "WMO-D1", title: "Weather Monitoring", group: "Climate Data" },
      { code: "WMO-D2", title: "Climate Forecasting", group: "Climate Data" }
    ]
  };

  const standards = {
    Health: [
      { code: "HL7-FHIR", name: "HL7 FHIR", domain: "Health Data Exchange" },
      { code: "DICOM", name: "DICOM", domain: "Medical Imaging" },
      { code: "IHE", name: "IHE Profiles", domain: "Health Interoperability" }
    ],
    Interoperability: [
      { code: "REST-API", name: "REST API", type: "Protocol" },
      { code: "OAUTH2", name: "OAuth 2.0", type: "Authentication" },
      { code: "OPENAPI", name: "OpenAPI", type: "Documentation" }
    ]
  };

  const initiatives = [
    { 
      id: "who-gdhp", 
      name: "WHO Global Digital Health Partnership", 
      description: "Global partnership for digital health",
      logo: "/placeholder.svg"
    },
    { 
      id: "gavi-dig", 
      name: "Gavi Digital Health", 
      description: "Digital health initiatives by Gavi",
      logo: "/placeholder.svg"
    }
  ];

  const ReferenceDataCard = ({ title, items, onAdd, onEdit, onDelete, type }: any) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            {type === 'classification' && <Tag className="h-5 w-5 mr-2" />}
            {type === 'standard' && <Shield className="h-5 w-5 mr-2" />}
            {type === 'initiative' && <BarChart3 className="h-5 w-5 mr-2" />}
            {title}
          </span>
          <Button size="sm" onClick={onAdd}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{item.title || item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.code} • {item.group || item.domain || item.type || item.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(item)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Tag className="h-8 w-8 mr-3 text-purple-600" />
            Reference Data Management
          </h1>
          <p className="text-muted-foreground">Manage classifications, standards, and initiatives</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reference data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="classifications" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="classifications">Classifications</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
        </TabsList>

        <TabsContent value="classifications" className="space-y-6">
          <div className="grid gap-6">
            <ReferenceDataCard
              title="WHO Classifications"
              items={classifications.WHO}
              type="classification"
              onAdd={() => console.log('Add WHO classification')}
              onEdit={(item: any) => console.log('Edit WHO:', item)}
              onDelete={(item: any) => console.log('Delete WHO:', item)}
            />
            <ReferenceDataCard
              title="DPI Classifications"
              items={classifications.DPI}
              type="classification"
              onAdd={() => console.log('Add DPI classification')}
              onEdit={(item: any) => console.log('Edit DPI:', item)}
              onDelete={(item: any) => console.log('Delete DPI:', item)}
            />
            <ReferenceDataCard
              title="WMO Classifications"
              items={classifications.WMO}
              type="classification"
              onAdd={() => console.log('Add WMO classification')}
              onEdit={(item: any) => console.log('Edit WMO:', item)}
              onDelete={(item: any) => console.log('Delete WMO:', item)}
            />
          </div>
        </TabsContent>

        <TabsContent value="standards" className="space-y-6">
          <div className="grid gap-6">
            <ReferenceDataCard
              title="Health Standards"
              items={standards.Health}
              type="standard"
              onAdd={() => console.log('Add health standard')}
              onEdit={(item: any) => console.log('Edit health standard:', item)}
              onDelete={(item: any) => console.log('Delete health standard:', item)}
            />
            <ReferenceDataCard
              title="Interoperability Standards"
              items={standards.Interoperability}
              type="standard"
              onAdd={() => console.log('Add interop standard')}
              onEdit={(item: any) => console.log('Edit interop standard:', item)}
              onDelete={(item: any) => console.log('Delete interop standard:', item)}
            />
          </div>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Collection Initiatives
                </span>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Initiative
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {initiatives.map((initiative) => (
                  <div key={initiative.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <img 
                        src={initiative.logo} 
                        alt={initiative.name}
                        className="h-12 w-12 rounded object-contain"
                      />
                      <div>
                        <p className="font-medium">{initiative.name}</p>
                        <p className="text-sm text-muted-foreground">{initiative.description}</p>
                        <Badge variant="outline" className="mt-1">{initiative.id}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
