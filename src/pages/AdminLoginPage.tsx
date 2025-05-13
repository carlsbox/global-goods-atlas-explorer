
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getSiteName } from "@/lib/config";
import AdminLanguageSwitcher from "@/components/admin/AdminLanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const siteName = getSiteName();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in a real app this would call your auth service
    setTimeout(() => {
      if (email === "admin@example.com" && password === "admin123") {
        // Store user info in localStorage (temporary solution - use proper auth in production)
        localStorage.setItem("cms_user", JSON.stringify({ 
          email, 
          role: "admin", 
          name: "Admin User" 
        }));
        toast.success(t("login.success", "admin"));
        navigate("/admin");
      } else if (email === "user@example.com" && password === "user123") {
        localStorage.setItem("cms_user", JSON.stringify({ 
          email, 
          role: "editor", 
          name: "Regular Editor" 
        }));
        toast.success(t("login.success", "admin"));
        navigate("/admin");
      } else {
        toast.error(t("login.error", "admin"));
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="absolute top-4 right-4">
        <AdminLanguageSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {siteName} {t("login.title", "admin")}
          </CardTitle>
          <CardDescription>
            {t("login.description", "admin")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.emailLabel", "admin")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("login.emailPlaceholder", "admin")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("login.passwordLabel", "admin")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("login.passwordPlaceholder", "admin")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-sm text-muted-foreground">
                {t("login.demoCredentials", "admin")}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? t("login.signingIn", "admin") : t("login.signIn", "admin")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
