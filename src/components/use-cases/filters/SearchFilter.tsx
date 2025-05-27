
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchFilter({ searchTerm, setSearchTerm }: SearchFilterProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search use cases by purpose, scope, challenges..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
