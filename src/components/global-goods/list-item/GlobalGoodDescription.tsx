
interface GlobalGoodDescriptionProps {
  summary?: string;
  description?: string;
}

export function GlobalGoodDescription({ summary, description }: GlobalGoodDescriptionProps) {
  return (
    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
      {summary || description}
    </p>
  );
}
