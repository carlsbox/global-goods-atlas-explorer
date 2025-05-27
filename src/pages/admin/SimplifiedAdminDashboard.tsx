
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  FileText, 
  Tags, 
  Shield, 
  Network,
  Plus,
  Eye,
  Edit,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/useI18n";

export default function SimplifiedAdminDashboard() {
  const { tPage } = useI18n();

  const contentTypes = [
    {
      title: "Global Goods",
      count: 48,
      icon: Globe,
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Manage digital global goods catalog",
      actions: [
        { label: "View All", href: "/admin/content/global-goods", icon: Eye },
        { label: "Add New", href: "/admin/content/global-goods/new", icon: Plus }
      ]
    },
    {
      title: "Use Cases",
      count: 126,
      icon: FileText,
      color: "text-green-600",
      bg: "bg-green-50",
      description: "Manage implementation use cases",
      actions: [
        { label: "View All", href: "/admin/content/use-cases", icon: Eye },
        { label: "Add New", href: "/admin/content/use-cases/new", icon: Plus }
      ]
    },
    {
      title: "Classifications",
      count: 85,
      icon: Tags,
      color: "text-purple-600",
      bg: "bg-purple-50",
      description: "WHO, DPI, WMO classifications",
      actions: [
        { label: "Manage", href: "/admin/reference/classifications", icon: Edit }
      ]
    },
    {
      title: "Standards",
      count: 34,
      icon: Shield,
      color: "text-orange-600",
      bg: "bg-orange-50",
      description: "Health & interoperability standards",
      actions: [
        { label: "Manage", href: "/admin/reference/standards", icon: Edit }
      ]
    }
  ];

  const recentActivity = [
    { type: "Global Good", name: "DHIS2", action: "Updated", time: "2 hours ago" },
    { type: "Use Case", name: "Heat Alert System", action: "Created", time: "4 hours ago" },
    { type: "Classification", name: "WHO-A2", action: "Modified", time: "1 day ago" },
    { type: "Standard", name: "HL7 FHIR", action: "Updated", time: "2 days ago" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage global goods, use cases, and reference data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/tools">
              <BarChart3 className="h-4 w-4 mr-2" />
              Tools
            </Link>
          </Button>
        </div>
      </div>

      {/* Content Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contentTypes.map((type) => (
          <Card key={type.title} className="group hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${type.bg}`}>
                  <type.icon className={`h-5 w-5 ${type.color}`} />
                </div>
                <span className="text-2xl font-bold">{type.count}</span>
              </div>
              <CardTitle className="text-lg">{type.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-2">
                {type.actions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.icon === Plus ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={action.href}>
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type} • {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" asChild>
              <Link to="/admin/content/global-goods/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Global Good
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/content/use-cases/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Use Case
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/tools/import">
                <FileText className="h-4 w-4 mr-2" />
                Import Data
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/admin/tools/export">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
