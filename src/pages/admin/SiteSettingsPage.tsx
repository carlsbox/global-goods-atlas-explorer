
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Loader2, Save, Upload } from "lucide-react";
import { getSiteName } from "@/lib/config";

// Form schema for site settings
const formSchema = z.object({
  siteName: z.string().min(2, {
    message: "Site name must be at least 2 characters.",
  }),
  domain: z.string().min(3, {
    message: "Domain must be at least 3 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  supportEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  googleAnalyticsId: z.string().optional(),
  twitterHandle: z.string().optional(),
  githubHandle: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

interface SiteSettings {
  siteName: string;
  domain: string;
  contactEmail: string;
  supportEmail: string;
  googleAnalyticsId?: string;
  twitterHandle?: string;
  githubHandle?: string;
  metaTitle?: string;
  metaDescription?: string;
  logo?: string;
  favicon?: string;
}

export default function SiteSettingsPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const { language } = useLanguage();
  
  // Check if current user is an admin
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const userStr = localStorage.getItem("cms_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setIsAdmin(user.role === "admin");
      if (user.role !== "admin") {
        toast.error("You don't have permission to access site settings");
        navigate("/admin");
      }
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  // Setup form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "",
      domain: "",
      contactEmail: "",
      supportEmail: "",
      googleAnalyticsId: "",
      twitterHandle: "",
      githubHandle: "",
      metaTitle: "",
      metaDescription: "",
    },
  });
  
  // Load site settings
  useEffect(() => {
    const loadSettings = () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call to fetch the settings
      setTimeout(() => {
        const siteSettings: SiteSettings = {
          siteName: getSiteName(),
          domain: "globalgoodsatlas.org",
          contactEmail: "info@globalgoodsatlas.org",
          supportEmail: "support@globalgoodsatlas.org",
          googleAnalyticsId: "G-XXXXXXXXXX",
          twitterHandle: "globalgoodsatlas",
          githubHandle: "globalgoodsatlas",
          metaTitle: "Global Goods Atlas - Discover Digital Public Goods",
          metaDescription: "Explore a comprehensive catalog of digital public goods and solutions making an impact across the globe.",
          logo: "/logo.png",
          favicon: "/favicon.ico",
        };
        
        setSettings(siteSettings);
        form.reset(siteSettings);
        
        // Set logo and favicon previews
        if (siteSettings.logo) {
          setLogoPreview(siteSettings.logo);
        }
        
        if (siteSettings.favicon) {
          setFaviconPreview(siteSettings.favicon);
        }
        
        setIsLoading(false);
      }, 1000);
    };
    
    if (isAdmin) {
      loadSettings();
    }
  }, [form, isAdmin]);
  
  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle favicon file selection
  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    
    try {
      // In a real app, you would submit this data to your backend
      console.log("Saving site settings:", {
        ...values,
        logo: logoPreview,
        favicon: faviconPreview,
      });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Site settings updated successfully");
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error("Failed to update site settings");
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading || !isAdmin) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Loading site settings...</p>
        </div>
      </div>
    );
  }
  
  if (!settings) return null;
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Site Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO & Analytics</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Basic information about your site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This email will be displayed on the contact page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="supportEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Support Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This email will be used for technical support inquiries
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Visual elements of your site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo upload */}
                  <div className="space-y-2">
                    <FormLabel>Site Logo</FormLabel>
                    <div className="flex items-start gap-4">
                      <div className="border rounded-md p-2 h-24 w-24 flex items-center justify-center">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <div className="text-muted-foreground text-xs text-center">
                            No logo uploaded
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          id="logo"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                        />
                        <label htmlFor="logo">
                          <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Logo
                            </span>
                          </Button>
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended size: 200x50px. PNG format with transparent background.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Favicon upload */}
                  <div className="space-y-2">
                    <FormLabel>Favicon</FormLabel>
                    <div className="flex items-start gap-4">
                      <div className="border rounded-md p-2 h-16 w-16 flex items-center justify-center">
                        {faviconPreview ? (
                          <img
                            src={faviconPreview}
                            alt="Favicon preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <div className="text-muted-foreground text-xs text-center">
                            No favicon
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          id="favicon"
                          type="file"
                          accept="image/x-icon,image/png"
                          className="hidden"
                          onChange={handleFaviconChange}
                        />
                        <label htmlFor="favicon">
                          <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            asChild
                          >
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Favicon
                            </span>
                          </Button>
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended size: 32x32px. ICO or PNG format.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO & Analytics</CardTitle>
                  <CardDescription>
                    Search engine optimization and analytics settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Meta Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The title that appears in search engine results
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Meta Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-24" />
                        </FormControl>
                        <FormDescription>
                          A brief description that appears in search engine results
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="googleAnalyticsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="G-XXXXXXXXXX" />
                        </FormControl>
                        <FormDescription>
                          Your Google Analytics measurement ID (e.g., G-XXXXXXXXXX)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Social media accounts and sharing settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="twitterHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter/X Handle</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="@username" />
                        </FormControl>
                        <FormDescription>
                          Without the @ symbol
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="githubHandle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Username/Organization</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
