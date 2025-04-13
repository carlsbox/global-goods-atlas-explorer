
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Globe, FileText, MapPin } from "lucide-react";
import { useGlobalGoods } from "@/lib/api";
import { useContentLoader } from "@/hooks/useContentLoader";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data: globalGoods, isLoading: isLoadingGoods } = useGlobalGoods();
  const { content, isLoading, error } = useContentLoader("pages/home");
  const [homeContent, setHomeContent] = useState<any>(null);

  useEffect(() => {
    if (content) {
      setHomeContent(content);
    }
  }, [content]);

  if (isLoading || !homeContent) {
    return (
      <div className="container py-12 text-center">
        <p>Loading content...</p>
      </div>
    );
  }
  
  if (error) {
    console.error("Error loading homepage content:", error);
    return (
      <div className="container py-12 text-center">
        <p>Failed to load content. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {homeContent.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {homeContent.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/global-goods">
                  {homeContent.hero.buttons.catalog} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/map">
                  {homeContent.hero.buttons.map} <MapPin className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{homeContent.features.goods.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {homeContent.features.goods.description}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/global-goods">
                      {homeContent.features.goods.button} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{homeContent.features.cases.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {homeContent.features.cases.description}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/use-cases">
                      {homeContent.features.cases.button} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{homeContent.features.map.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {homeContent.features.map.description}
                  </p>
                  <Button asChild variant="link">
                    <Link to="/map">
                      {homeContent.features.map.button} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Global Goods */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{homeContent.featuredGoods.title}</h2>
            <Button asChild variant="link" className="mt-2 md:mt-0">
              <Link to="/global-goods">
                {homeContent.featuredGoods.viewAll} <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingGoods ? (
              <p>Loading featured global goods...</p>
            ) : (
              globalGoods?.slice(0, 3).map((good) => (
                <Link to={`/global-goods/${good.id}`} key={good.id}>
                  <Card className="transition-all hover:shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          {good.logo ? (
                            <img 
                              src={good.logo} 
                              alt={good.name} 
                              className="h-10 w-10 mr-3"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-primary/10 rounded-full mr-3" />
                          )}
                          <h3 className="font-semibold">{good.name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {good.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {good.sector?.slice(0, 2).map(sector => (
                            <span 
                              key={sector}
                              className="text-xs bg-secondary px-2 py-1 rounded-full"
                            >
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
