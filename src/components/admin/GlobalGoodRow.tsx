
import { GlobalGood } from "@/lib/types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/hooks/useI18n";

interface GlobalGoodRowProps {
  good: GlobalGood;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export function GlobalGoodRow({ good, isSelected, onToggleSelect }: GlobalGoodRowProps) {
  const { getText } = useI18n();
  const goodName = getText(good.name);
  const goodDescription = getText(good.description);
  
  return (
    <TableRow key={good.id}>
      <TableCell>
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={onToggleSelect}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          {good.logo ? (
            <img 
              src={good.logo} 
              alt={goodName} 
              className="h-8 w-8 object-contain rounded-sm"
              onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
            />
          ) : (
            <div className="h-8 w-8 rounded-sm bg-muted flex items-center justify-center">
              {goodName.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium">{goodName}</p>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {goodDescription.length > 50
                ? `${goodDescription.slice(0, 50)}...`
                : goodDescription}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {good.sector.slice(0, 2).map(sector => (
            <Badge key={sector} variant="outline">{sector}</Badge>
          ))}
          {good.sector.length > 2 && (
            <Badge variant="outline">+{good.sector.length - 2}</Badge>
          )}
        </div>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {good.countries.length > 0 
          ? `${good.countries.length} countries` 
          : "Not specified"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {good.lastUpdated}
      </TableCell>
      <TableCell className="text-right space-x-1">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/global-goods/${good.id}`} target="_blank">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/admin/global-goods/edit/${good.id}`}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            toast.warning(`This would delete ${goodName} in a real application`, {
              description: "Mock functionality for demonstration",
            });
          }}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
