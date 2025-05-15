import { UseCase } from "@/lib/types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil, Trash, Eye } from "lucide-react";
import { toast } from "sonner";

interface UseCaseRowProps {
  useCase: UseCase;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export function UseCaseRow({ useCase, isSelected, onToggleSelect }: UseCaseRowProps) {
  return (
    <TableRow key={useCase.id}>
      <TableCell>
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={onToggleSelect}
        />
      </TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{useCase.title}</p>
          <p className="text-xs text-muted-foreground hidden sm:block">
            {useCase.description.length > 50
              ? `${useCase.description.slice(0, 50)}...`
              : useCase.description}
          </p>
          <div className="mt-1 hidden sm:flex flex-wrap gap-1">
            {useCase.globalGoods.slice(0, 2).map(goodId => (
              <Badge key={goodId} variant="outline" className="text-xs">
                {goodId}
              </Badge>
            ))}
            {useCase.globalGoods.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{useCase.globalGoods.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {useCase.country}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Badge variant="secondary">{useCase.sector}</Badge>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {useCase.year}
      </TableCell>
      <TableCell className="text-right space-x-1">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/use-cases/${useCase.id}`} target="_blank">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/admin/use-cases/edit/${useCase.id}`}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            toast.warning(`This would delete "${useCase.title}" in a real application`, {
              description: "Mock functionality for demonstration",
            });
          }}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
