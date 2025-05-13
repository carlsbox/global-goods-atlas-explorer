
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GlobalGood } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Loader2, Save, ArrowLeft, Globe, Upload } from "lucide-react";

// Mock function to get a global good by ID
async function getGlobalGoodById(id: string): Promise<GlobalGood | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === "dhis2") {
        resolve({
          id: "dhis2",
          name: "DHIS2",
          description: "A flexible information system for data capture and visualization",
          sector: ["Health", "Data Management"],
          countries: ["Tanzania", "Uganda", "Kenya", "Rwanda"],
          technologies: ["JavaScript", "React", "Java"],
          lastUpdated: "2025-04-10",
          logo: "/logos/dhis2.png",
          maturity: "Mature",
          tags: ["Data", "Visualization", "Health"]
        });
      } else if (id === "openimis") {
        resolve({
          id: "openimis",
          name: "openIMIS",
          description: "An insurance management information system",
          sector: ["Health", "Insurance"],
          countries: ["Cameroon", "Nepal", "Tanzania"],
          technologies: ["Python", "React", "Docker"],
          lastUpdated: "2025-04-05",
          logo: "/logos/openimis.png",
          maturity: "Established",
          tags: ["Insurance", "Claims", "Health"]
        });
      } else {
        resolve(null);
      }
    }, 1000);
  });
}

// Form schema for global good
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  github: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  maturity: z.string().optional(),
  summary: z.string().optional(),
});

export default function GlobalGoodFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(id !== undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<string>("en");
  
  // Form fields that might vary by language
  const [localizedFields, setLocalizedFields] = useState<Record<string, any>>({
    en: { name: "", description: "", summary: "" },
    fr: { name: "", description: "", summary: "" },
    es: { name: "", description: "", summary: "" },
  });
  
  // Fields for tags, sectors, etc. (multi-value fields)
  const [sectors, setSectors] = useState<string[]>([]);
  const [newSector, setNewSector] = useState("");
  
  const [countries, setCountries] = useState<string[]>([]);
  const [newCountry, setNewCountry] = useState("");
  
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTechnology, setNewTechnology] = useState("");
  
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const { language } = useLanguage();
  
  // Setup form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      github: "",
      maturity: "",
      summary: "",
    },
  });
  
  // Load global good data if editing an existing one
  useEffect(() => {
    const fetchGlobalGood = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      
      try {
        const globalGood = await getGlobalGoodById(id);
        
        if (globalGood) {
          // Set form values from global good data
          form.reset({
            name: globalGood.name,
            description: globalGood.description,
            website: globalGood.website || "",
            github: globalGood.github || "",
            maturity: globalGood.maturity || "",
            summary: globalGood.summary || "",
          });
          
          // Set other fields
          setSectors(globalGood.sector || []);
          setCountries(globalGood.countries || []);
          setTechnologies(globalGood.technologies || []);
          setTags(globalGood.tags || []);
          
          // Set logo preview if available
          if (globalGood.logo) {
            setLogoPreview(globalGood.logo);
          }
          
          // In a real app, you'd load localized content for each language
          // For this mock, we're just setting the same content for all languages
          setLocalizedFields({
            en: { 
              name: globalGood.name, 
              description: globalGood.description, 
              summary: globalGood.summary || "" 
            },
            fr: { 
              name: globalGood.name, 
              description: globalGood.description, 
              summary: globalGood.summary || "" 
            },
            es: { 
              name: globalGood.name, 
              description: globalGood.description, 
              summary: globalGood.summary || "" 
            },
          });
        }
      } catch (error) {
        console.error("Failed to load global good", error);
        toast.error("Failed to load global good data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGlobalGood();
  }, [id, form]);
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    
    try {
      // Combine form values with other state values
      const globalGoodData = {
        ...values,
        id: id || `new-${Date.now()}`, // Generate an ID for new global goods
        sector: sectors,
        countries: countries,
        technologies: technologies,
        tags: tags,
        lastUpdated: new Date().toISOString().split('T')[0],
        localizedContent: localizedFields,
      };
      
      // In a real app, you would submit this data to your backend
      console.log("Saving global good:", globalGoodData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success(
        id ? "Global good updated successfully" : "Global good created successfully",
        { description: values.name }
      );
      
      // Redirect back to the global goods list
      navigate("/admin/global-goods");
    } catch (error) {
      console.error("Failed to save global good", error);
      toast.error("Failed to save global good");
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle logo file selection
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to add a new item to a list (sector, country, etc.)
  const addItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    newItem: string,
    setNewItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!newItem.trim()) return;
    if (!list.includes(newItem.trim())) {
      setList([...list, newItem.trim()]);
    }
    setNewItem("");
  };
  
  // Function to remove an item from a list
  const removeItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setList(list.filter((i) => i !== item));
  };
  
  // Handle language tab change
  const handleLanguageChange = (lang: string) => {
    // Save current form values to the current language
    const currentValues = form.getValues();
    setLocalizedFields({
      ...localizedFields,
      [activeLanguage]: {
        name: currentValues.name,
        description: currentValues.description,
        summary: currentValues.summary || "",
      },
    });
    
    // Set form values for the new language
    setActiveLanguage(lang);
    form.setValue("name", localizedFields[lang].name);
    form.setValue("description", localizedFields[lang].description);
    form.setValue("summary", localizedFields[lang].summary || "");
  };
  
  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Loading global good data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/admin/global-goods")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">
          {id ? "Edit Global Good" : "Add New Global Good"}
        </h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Language tabs for localized content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Localized Content</CardTitle>
              <CardDescription>
                Edit content for each supported language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeLanguage} onValueChange={handleLanguageChange}>
                <TabsList>
                  <TabsTrigger value="en" className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    English
                  </TabsTrigger>
                  <TabsTrigger value="fr" className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    Français
                  </TabsTrigger>
                  <TabsTrigger value="es" className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    Español
                  </TabsTrigger>
                </TabsList>
                
                {/* All language tabs use the same form fields */}
                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., DHIS2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Brief description of the global good"
                            className="min-h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detailed Summary (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Provide a detailed description of the global good"
                            className="min-h-48"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* General information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">General Information</CardTitle>
              <CardDescription>
                Basic details and links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.org" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repository (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://github.com/organization/repo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maturity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maturity Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select maturity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Emerging">Emerging</SelectItem>
                        <SelectItem value="Established">Established</SelectItem>
                        <SelectItem value="Mature">Mature</SelectItem>
                        <SelectItem value="Global Scale">Global Scale</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Logo upload */}
              <div className="space-y-2">
                <FormLabel>Logo</FormLabel>
                <div className="flex items-start gap-4">
                  <div className="border rounded-md p-2 h-24 w-24 flex items-center justify-center">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
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
                      Recommended size: 200x200px. PNG or JPEG.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Categories and tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Categories and Tags</CardTitle>
              <CardDescription>
                Help users find this global good
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sectors */}
              <div className="space-y-2">
                <FormLabel>Sectors</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sectors.map((sector) => (
                    <Badge key={sector} variant="secondary" className="px-3 py-1.5">
                      {sector}
                      <button
                        type="button"
                        onClick={() => removeItem(sectors, setSectors, sector)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {sector}</span>
                      </button>
                    </Badge>
                  ))}
                  {sectors.length === 0 && (
                    <span className="text-sm text-muted-foreground">No sectors added</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a sector..."
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addItem(sectors, setSectors, newSector, setNewSector);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem(sectors, setSectors, newSector, setNewSector)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add sector</span>
                  </Button>
                </div>
              </div>
              
              {/* Countries */}
              <div className="space-y-2">
                <FormLabel>Countries</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {countries.map((country) => (
                    <Badge key={country} variant="secondary" className="px-3 py-1.5">
                      {country}
                      <button
                        type="button"
                        onClick={() => removeItem(countries, setCountries, country)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {country}</span>
                      </button>
                    </Badge>
                  ))}
                  {countries.length === 0 && (
                    <span className="text-sm text-muted-foreground">No countries added</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a country..."
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addItem(countries, setCountries, newCountry, setNewCountry);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem(countries, setCountries, newCountry, setNewCountry)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add country</span>
                  </Button>
                </div>
              </div>
              
              {/* Technologies */}
              <div className="space-y-2">
                <FormLabel>Technologies</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-3 py-1.5">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeItem(technologies, setTechnologies, tech)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tech}</span>
                      </button>
                    </Badge>
                  ))}
                  {technologies.length === 0 && (
                    <span className="text-sm text-muted-foreground">No technologies added</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology..."
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addItem(technologies, setTechnologies, newTechnology, setNewTechnology);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem(technologies, setTechnologies, newTechnology, setNewTechnology)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add technology</span>
                  </Button>
                </div>
              </div>
              
              {/* Tags */}
              <div className="space-y-2">
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1.5">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeItem(tags, setTags, tag)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </button>
                    </Badge>
                  ))}
                  {tags.length === 0 && (
                    <span className="text-sm text-muted-foreground">No tags added</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addItem(tags, setTags, newTag, setNewTag);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addItem(tags, setTags, newTag, setNewTag)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add tag</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Form actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/global-goods")}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Global Good
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
