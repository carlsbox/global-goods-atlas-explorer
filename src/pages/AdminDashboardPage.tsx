
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Globe, Users, Eye, ArrowUpRight, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardStats {
  globalGoods: number;
  useCases: number;
  users: number;
  visitors: number;
  recentGlobalGoods: Array<{id: string; name: string; updatedAt: string}>;
  recentUseCases: Array<{id: string; title: string; updatedAt: string}>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchData = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        setStats({
          globalGoods: 48,
          useCases: 126,
          users: 15,
          visitors: 2873,
          recentGlobalGoods: [
            { id: "dhis2", name: "DHIS2", updatedAt: "2025-04-10" },
            { id: "openimis", name: "openIMIS", updatedAt: "2025-04-05" },
            { id: "openmrs", name: "OpenMRS", updatedAt: "2025-04-01" },
            { id: "bahmni", name: "Bahmni", updatedAt: "2025-03-28" },
          ],
          recentUseCases: [
            { id: "1", title: "COVID-19 Response in Kenya", updatedAt: "2025-04-12" },
            { id: "2", title: "Maternal Health in Tanzania", updatedAt: "2025-04-08" },
            { id: "3", title: "Vaccine Management in India", updatedAt: "2025-04-03" },
            { id: "4", title: "Telemedicine in Rural Brazil", updatedAt: "2025-03-25" },
          ]
        });
        setIsLoading(false);
      }, 1000);
    };
    
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 w-24 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-10 w-16 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  if (!stats) return null;
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
              Global Goods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.globalGoods}</p>
            <p className="text-xs text-muted-foreground mt-1">Across all sectors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.useCases}</p>
            <p className="text-xs text-muted-foreground mt-1">From 38 countries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.users}</p>
            <p className="text-xs text-muted-foreground mt-1">4 admins, 11 editors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
              Monthly Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.visitors}</p>
            <p className="text-xs text-muted-foreground mt-1">↑ 12.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Content tabs for recent items */}
      <Tabs defaultValue="globalGoods" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="globalGoods">Recent Global Goods</TabsTrigger>
            <TabsTrigger value="useCases">Recent Use Cases</TabsTrigger>
          </TabsList>
          <BarChart3 className="h-4 w-4 text-muted-foreground mr-2" />
        </div>
        
        <TabsContent value="globalGoods" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Recently Updated Global Goods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {stats.recentGlobalGoods.map((item) => (
                  <li key={item.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Updated: {item.updatedAt}</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/admin/global-goods/edit/${item.id}`}>Edit</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/global-goods/${item.id}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="/admin/global-goods">
                  View All Global Goods
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="useCases" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Recently Updated Use Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {stats.recentUseCases.map((item) => (
                  <li key={item.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">Updated: {item.updatedAt}</p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/admin/use-cases/edit/${item.id}`}>Edit</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/use-cases/${item.id}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="/admin/use-cases">
                  View All Use Cases
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
