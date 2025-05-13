
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/hooks/useI18n";
import { toast } from "@/components/ui/use-toast";
import { LanguageCode } from "@/lib/types";

const languages = [
  { code: 'en' as LanguageCode, name: 'English' },
  { code: 'fr' as LanguageCode, name: 'Français' },
  { code: 'es' as LanguageCode, name: 'Español' }
];

export default function AdminLanguageSwitcher() {
  const { language, changeLanguage, tPage } = useI18n();

  const handleLanguageChange = (langCode: LanguageCode) => {
    changeLanguage(langCode);
    toast({
      description: `${tPage('common.languageChanged', 'admin')}: ${languages.find(lang => lang.code === langCode)?.name}`
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{tPage('common.selectLanguage', 'admin')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? "bg-secondary" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
