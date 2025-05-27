
import { useI18n } from "@/hooks/useI18n";

export function UseCasesHeader() {
  const { tPage } = useI18n();

  return (
    <div className="max-w-4xl mx-auto mb-12 text-center">
      <h1 className="mb-6">{tPage("title", "useCases")}</h1>
      <p className="text-xl text-muted-foreground">
        Explore comprehensive workflow documentation and implementation guides for digital health solutions.
      </p>
    </div>
  );
}
