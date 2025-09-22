
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Globe, FileText, MapPin, Mail, Heart, Calendar } from "lucide-react";
import { useFeaturedGlobalGoods } from "@/lib/api/globalGoodsFlat";
import { useI18n } from "@/hooks/useI18n";
import { SEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";

// Skeleton component for featured goods loading state
function FeaturedGoodsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="transition-all">
          <CardContent className="pt-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <Skeleton className="h-10 w-10 rounded mr-3" />
                <Skeleton className="h-5 w-32" />
              </div>
              <div className="space-y-2 mb-4 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex flex-wrap gap-1 mt-auto">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function HomePage() {
  // Use lightweight featured goods hook - much faster loading!
  const { data: featuredGoods, isLoading: isLoadingGoods } = useFeaturedGlobalGoods();
  const { t, tPage } = useI18n();
  const { toast } = useToast();
  const { isUseCasesInHomePage } = useFeatureFlags();
  
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call - replace with actual newsletter signup logic
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      {/* Hero Section - Renders immediately */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {tPage('hero.title', 'home')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {tPage('hero.subtitle', 'home')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/global-goods">
                  {tPage('hero.buttons.catalog', 'home')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/map">
                  {tPage('hero.buttons.map', 'home')} <MapPin className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Renders immediately */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className={`grid grid-cols-1 ${isUseCasesInHomePage ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'} gap-8`}>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('features.goods.title', 'home')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {tPage('features.goods.description', 'home')}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/global-goods">
                      {tPage('features.goods.button', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {isUseCasesInHomePage && (
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tPage('features.cases.title', 'home')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {tPage('features.cases.description', 'home')}
                    </p>
                    <Button asChild variant="link">
                      <Link to="/use-cases">
                        {tPage('features.cases.button', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tPage('features.map.title', 'home')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {tPage('features.map.description', 'home')}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/map">
                      {tPage('features.map.button', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Climate & Health Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Globe className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                {tPage('climateHealth.announcement', 'home')}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {tPage('climateHealth.title', 'home')}
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              {tPage('climateHealth.description', 'home')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/80 dark:bg-card/80 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">3</div>
                <div className="text-sm font-medium text-muted-foreground">
                  {tPage('climateHealth.stats.tools', 'home')}
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-card/80 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">50+</div>
                <div className="text-sm font-medium text-muted-foreground">
                  {tPage('climateHealth.stats.countries', 'home')}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Link to="/global-goods?climate-health=true">
                  {tPage('climateHealth.button', 'home')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/climate-health">
                  Learn More <Heart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Global Goods - Progressive loading */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{tPage('featuredGoods.title', 'home')}</h2>
            <Button asChild variant="link" className="mt-2 md:mt-0">
              <Link to="/global-goods">
                {tPage('featuredGoods.viewAll', 'home')} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {isLoadingGoods ? (
            <FeaturedGoodsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGoods?.map((good) => (
                <Link to={`/global-goods/${good.ID}`} key={good.ID}>
                  <Card className="transition-all hover:shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          {good.Logo ? (
                            <img 
                              src={good.Logo} 
                              alt={good.Name} 
                              className="h-10 w-10 mr-3"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-primary/10 rounded-full mr-3" />
                          )}
                          <h3 className="font-semibold">{good.Name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {good.ProductOverview?.Description || good.ProductOverview?.Summary || ''}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {good.GlobalGoodsType?.slice(0, 2).map(type => (
                            <span 
                              key={type.code || type.title}
                              className="text-xs bg-secondary px-2 py-1 rounded-full"
                            >
                              {type.title || type.code}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </>
  );
}
